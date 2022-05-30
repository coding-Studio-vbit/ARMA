const students = require("../../models/student");
const studentReports = require("../util/studentReports");
const response = require("../util/response");
const fs = require("fs/promises");
const path = require("path");
const coursesInfo = require("../../static_data/courses.json");
const pdf = require("html-pdf");
const md5 = require("md5");

const getStudentsList = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;
  console.log(req.user);
  //For filters
  let where = {};
  if (req.query.name) where.name = { $regex: req.query.name, $options: "i" };
  if (req.query.rollNumber)
    where.rollNumber = { $regex: req.query.rollNumber, $options: "i" };
  if (req.query.branch) where.branch = req.query.branch;
  if (req.query.year) where.year = req.query.year;
  if (req.query.section) where.section = req.query.section;
  if (req.query.attendedEvents) where.attendedEvents = req.query.attendedEvents;
  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await students
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
    for (let i = 0; i < req.body.length; i++) {
      let data = req.body[i];
      let value = await students.findOne({ rollNumber: data.rollNumber });
      if (!value) {
        console.log(data);
        let newStudent = students(data);
        await newStudent.save();
      }
      else{
        await students.findOneAndUpdate(
          {rollNumber:data.rollNumber},
          {$set:{year:data.year,
                 email:data.email}},
          { new: true });
      }
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
      name: { $regex: `^${rollNumber}`, $options: "i" },
    });
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const deleteStudent = async (req, res) => {
  try {
    let { id } = req.body;
    let student = await students.deleteOne({ _id: id });
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const studentViewCard = async (req, res) => {
  try {
    let { id } = req.body;
    let student = await students
      .findOne({ _id: id })
      .populate("forumMemberships.forumId")
      .populate({ path: "eventsParticipated", populate: { path: "forumID" } });
    let { attendedEvents, ...stu } = student.toObject();
    for (let i = 0; i < attendedEvents.length; i++) {
      let set = new Set();
      for (let j = 0; j < attendedEvents[i].halls.length; j++) {
        set.add(attendedEvents[i].halls[j].date);
      }
      attendedEvents[i]["duration"] = 3; //set.size
    }
    stu["attendedEvents"] = null;
    stu["attendedEvents"] = attendedEvents;
    console.log(student.attendedEvents);
    res.json(response(stu, process.env.SUCCESS_CODE));
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
      .populate({ path: "eventsOrganized", populate: { path: "forumID" } })
      .populate("forumNonCoreTeamMemberships")
      .populate("forumCoreTeamMemberships.forumId")
      .populate("eventsParticipated");
    const result = await studentReports.generateNewReport(student);

    pdf.create(result.data).toFile(result.filePath, async (err, data) => {
      if (err) throw err;
      else {
        student.reportFilePath = result.filePath;
        console.log(result.filePath);
        await student.save();
        res.sendFile(result.filePath);
      }
    });
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const getBranches = async (req, res) => {
  try {
    const { course } = req.params;
    res.json(
      response(
        Object.keys(coursesInfo[course]["branches"]),
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
    res.json(
      response(coursesInfo[course]["totalYears"], process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};
const getTotalSections = async (req, res) => {
  try {
    const { course, branch } = req.params;
    console.log("hi", course, branch, coursesInfo);
    res.json(
      response(
        coursesInfo[course].branches[branch].sections,
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
    res.json(response(Object.keys(coursesInfo), process.env.SUCCESS_CODE));
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
