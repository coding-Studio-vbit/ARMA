const courseModel = require("../../models/course");
const escapeRegex = require("../util/escapeRegex");
const students = require("../../models/student");
const studentReports = require("../util/studentReports");
const response = require("../util/response");
const fs = require("fs/promises");
const path = require("path");
const coursesInfo = require("../../static_data/courses.json");
const pdf = require("html-pdf");
const md5 = require("md5");

const getStudentsList = async (req, res) => {
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  let where = {};
  if (req.query.name) where.name = { $regex: escapeRegex(req.query.name), $options: "i" };
  if (req.query.rollNumber) where.rollNumber = { $regex: escapeRegex(req.query.rollNumber), $options: "i" };
  if (req.query.branch) where.branch = req.query.branch;
  if (req.query.year) where.year = req.query.year;
  if (req.query.section) where.section = req.query.section;
  if (req.query.attendedEvents) where.attendedEvents = req.query.attendedEvents;

  let sort = {};
  if (req.query.orderBy && req.query.order) sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    const result = await students
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await students.countDocuments(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response(
        { message: "Student data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

// ENDPOINT FOR ADDING STUDENTS VIA EXCEL SHEET

const uploadStudentsList = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.json(response("No student records provided", process.env.FAILURE_CODE || 0));
    }
    const operations = req.body
      .filter((s) => s && s.rollNumber)
      .map((data) => ({
        updateOne: {
          filter: { rollNumber: String(data.rollNumber).trim().toUpperCase() },
          update: {
            $set: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              branch: data.branch,
              year: data.year,
              section: data.section,
              rollNumber: String(data.rollNumber).trim().toUpperCase(),
            },
          },
          upsert: true,
        },
      }));
    if (operations.length > 0) {
      await students.bulkWrite(operations, { ordered: false });
    }
    res.json(
      response(
        { message: "Students added successfully!" },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Internal Server Error, try again after sometime" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const editStudent = async (req, res) => {
  try {
    const { id, name, rollNumber, year, branch, section, email, phone } =
      req.body;
    await students.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          rollNumber: rollNumber,
          year: year,
          branch: branch,
          section: section,
          email: email,
          phone: phone,
        },
      },
      { new: true }
    );
    res.json(
      response("Student Details edited successfully!", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const fetchStudents = async (req, res) => {
  try {
    let { rollNumber } = req.body;
    let student = await students.find({
      rollNumber: { $regex: `^${escapeRegex(rollNumber)}`, $options: "i" },
    });
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const deleteStudent = async (req, res) => {
  try {
    let { id } = req.body;
    let student = await students.deleteOne({ _id: id });
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const studentViewCard = async (req, res) => {
  try {
    let { id } = req.body;
    let student = await students
      .findOne({ _id: id })
      .populate("forumCoreTeamMemberships.forumId")
      .populate("forumNonCoreTeamMemberships")
      .populate({ path: "eventsParticipated", populate: {path: "forumID"} })
      .populate({ path: "eventsOrganized", populate: {path: "forumID"} });
    // let { attendedEvents, ...stu } = student.toObject();
    // for (let i = 0; i < attendedEvents.length; i++) {
    //   let set = new Set();
    //   for (let j = 0; j < attendedEvents[i].halls.length; j++) {
    //     set.add(attendedEvents[i].halls[j].date);
    //   }
    //   attendedEvents[i]["duration"] = 3; //set.size
    // }
    // stu["attendedEvents"] = null;
    // stu["attendedEvents"] = attendedEvents;
    // console.log(student.attendedEvents);
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const generatePDF = async (req, res) => {
  try {
    const { studentId } = req.body;
    const student = await students
      .findById(studentId)
      .populate("forumNonCoreTeamMemberships")
      .populate({
        path: "forumCoreTeamMemberships",
        populate: { path: "forumId" }
      })
      .populate({path: "eventsOrganized", populate: {path: "forumID"}})
      .populate({path: "eventsParticipated", populate: {path: "forumID"}});
    const result = await studentReports.generateNewReport(student);

    pdf.create(result.data).toFile(result.filePath, async (err, data) => {
      if (err) {
        console.error("PDF generation failed:", err.message);
        return res.json(response("PDF generation failed: " + err.message, process.env.FAILURE_CODE));
      }
      student.reportFilePath = result.filePath;
      await student.save();
      res.sendFile(result.filePath);
    });
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const getCoursesData = async () => {
  try {
    const dbCourses = await courseModel.find();
    if (dbCourses && dbCourses.length > 0) {
      const merged = { ...coursesInfo };
      dbCourses.forEach((c) => {
        merged[c.name] = { totalYears: c.totalYears, branches: c.branches };
      });
      return merged;
    }
  } catch (e) {
    // fallback to static file
  }
  return coursesInfo;
};

const getBranches = async (req, res) => {
  try {
    const { course } = req.params;
    const allCourses = await getCoursesData();
    if (!course || !allCourses[course] || !allCourses[course]["branches"]) {
      return res.json(response([], process.env.SUCCESS_CODE));
    }
    res.json(
      response(
        Object.keys(allCourses[course]["branches"]),
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};
const getTotalYears = async (req, res) => {
  try {
    const { course } = req.params;
    const allCourses = await getCoursesData();
    if (!course || !allCourses[course]) {
      return res.json(response(0, process.env.SUCCESS_CODE));
    }
    res.json(
      response(allCourses[course]["totalYears"], process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};
const getTotalSections = async (req, res) => {
  try {
    const { course, branch } = req.params;
    const allCourses = await getCoursesData();
    if (
      !course ||
      !branch ||
      !allCourses[course] ||
      !allCourses[course].branches ||
      !allCourses[course].branches[branch]
    ) {
      return res.json(response([], process.env.SUCCESS_CODE));
    }
    res.json(
      response(
        allCourses[course].branches[branch].sections,
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};
const getCourses = async (req, res) => {
  try {
    const allCourses = await getCoursesData();
    res.json(response(Object.keys(allCourses), process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

module.exports = {
  generatePDF,
  getStudentsList,
  uploadStudentsList,
  editStudent,
  fetchStudents,
  studentViewCard,
  deleteStudent,
  getBranches,
  getCourses,
  getTotalYears,
  getTotalSections,
};

//eventID 61da9c41ee32a8e65373fcc4
