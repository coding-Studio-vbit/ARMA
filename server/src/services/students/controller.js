const students = require("../../models/student");
const response = require("../util/response");

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
    const total = await students.count(where);
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
      } else if (data.attendedEvents.length > 0) {
        await students.findOneAndUpdate(
          { rollNumber: data.rollNumber },
          { $addToSet: { attendedEvents: [data.attendedEvents] } }
        );
      }
    }
    res.json(
      response(
        { message: "Students added successfully" },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(
      response({ message: "Internal Server Error" }, process.env.SUCCESS_CODE)
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
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const fetchStudents = async (req, res) => {
  try {
    let student = await students.find({});
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const deleteStudent = async (req, res) => {
  try {
    let { id } = req.body;
    let student = await students.deleteOne({ _id: id });
    res.json(response(student, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const studentViewCard = async (req, res) => {
  try {
    let { id } = req.body;
    let student = await students
      .findOne({ _id: id })
      .populate("coreTeamMember.forumID")
      .populate({ path: "attendedEvents", populate: { path: "forumID" } });
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
    res.json(response(err, process.env.FAILURE_CODE));
  }
};
module.exports = {
  getStudentsList,
  uploadStudentsList,
  editStudent,
  fetchStudents,
  studentViewCard,
  deleteStudent,
};

//eventID 61da9c41ee32a8e65373fcc4
