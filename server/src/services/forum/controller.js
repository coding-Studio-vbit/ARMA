const { welcomeTemplate } = require("../../email_templates/templates");
const events = require("../../models/event");
const forums = require("../../models/forum");
const response = require("../util/response");
const students = require("../../models/student");
const equipments = require("../../models/equipment");
const facultyModel = require("../../models/faculty");
const mongoose = require("mongoose");

const dashboard = async (req, res) => {
  try {
    let myEvents = await events.find({ forumID: req.user._id });
    let statistics = { engagement: 4, total: myEvents.length };
    console.log(myEvents);
    res.json(
      response(
        { events: myEvents, statistics: statistics },
        process.env.SUCCESS_CODE
      )
    );
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};
const getEquipments = async (req, res) => {
  try {
    let myEquip = await equipments.find({});
    res.json(response(myEquip, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const getForumsList = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.name) where.name = { $regex: req.query.name, $options: "i" };

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await forums
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .select("-password");
    const total = await forums.count(where);
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

const addNewForumMembers = async (req, res) => {
  try {
    const { forumName, ...stuser } = req.body;
    let stu = await students.findOne({ rollNumber: stuser.rollNumber });
    const forum = await forums.findOne({ name: forumName });
    const studentExists = forum.forumMembers.find(
      (v) => v.toString() === stu._id.toString()
    );
    if (studentExists) throw "Student already exists";
    if (stu) {
      await forums.findOneAndUpdate(
        { name: forumName },
        { $push: { forumMembers: stu } }
      );
    } else {
      let student = new students(stuser);
      await student.save();
      await forums.findOneAndUpdate(
        { name: forumName },
        { $push: { forumMembers: student } }
      );
    }
    res.json(response("New Forum Member Added", process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const addNewCoreForumMember = async (req, res) => {
  try {
    const { forumName, designation, ...stuser } = req.body;
    let stu = await students.findOne({ rollNumber: stuser.rollNumber });
    const forum = await forums.findOne({ name: forumName });
    console.log(forum.forumCoreTeamMembers[10].studentID.toString());

    if (stu) {
      const studentExists = forum.forumCoreTeamMembers.find((v) => {
        return v.studentID.toString() === stu._id.toString();
      });
      if (studentExists) throw "Student already exists";
      await forums.findOneAndUpdate(
        { name: forumName },
        {
          $addToSet: {
            forumCoreTeamMembers: { designation: designation, studentID: stu },
          },
        }
      );
    } else {
      let student = new students(stuser);
      await student.save();
      await forums.findOneAndUpdate(
        { name: forumName },
        {
          $addToSet: {
            forumCoreTeamMembers: {
              designation: designation,
              studentID: student,
            },
          },
        }
      );
    }
    res.json(response("New Core Forum Member Added", process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const getCoreForumMembers = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  where["name"] = req.query.name;
  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };
  try {
    result = await forums
      .findOne(where)
      .select("-password")
      .populate({ path: "forumCoreTeamMembers.studentID" });
    // [0,1,2,3,4,5,6,7,8,9,10]
    const mem = result.forumCoreTeamMembers.slice(
      limit * (page - 1),
      limit * page
    );
    console.log(limit * (page - 1));
    res.json(
      response(
        { data: mem, total: result.forumCoreTeamMembers.length },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Forum Core Team Members data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const getForumMembers = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  console.log(req.query.name);
  if (req.query.name) where.name = req.query.name;

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };
  try {
    result = await forums
      .findOne({ name: req.query.name })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .select("-password")
      .populate({ path: "forumMembers" });
    res.json(
      response(
        { data: result.forumMembers, total: result.forumMembers.length },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Forum Team Members data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const editForum = async (req, res) => {
  try {
    const { id, name, phone, forumHeads, facultyID } = req.body;
    const faculty = await facultyModel.findById(facultyID);
    await forums.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          facultyCoordinatorID: faculty,
          forumHeads: forumHeads,
          phone: phone,
        },
      },
      { new: true }
    );
    res.json(
      response("Forum Details edited successfully!", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const forumEventNumber = async (req, res) => {
  try {
    const { forumID } = req.body;
    const result = await events
      .find({
        forumID: forumID,
        eventStatus: { $nin: ["REJECTED", "APPROVED", "COMPLETED"] },
      })
      .count();
    res.json(response(result, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const updateProfile = async (req, res) => {
  try {
    const { description, facultyCoordinator, email } = req.body;
    const faculty = await facultyModel.findOne({ name: facultyCoordinator });
    if (faculty == null) {
      throw "Details could not be updated";
    }
    const user = await forums
      .findOneAndUpdate(
        { email: email },
        { $set: { description: description, facultyCoordinatorID: faculty } },
        { new: true }
      )
      .populate("facultyCoordinatorID name")
      .populate("role");
    res.json(response(user, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(
      response("Details could not be updated", process.env.FAILURE_CODE)
    );
  }
};

const deleteforumMember = async (req, res) => {
  try {
    const { forumName, studentID, userType } = req.body;
    if (userType === "core") {
      console.log(forumName,studentID);
      
      await forums.updateOne(
        { name: forumName },
        {
          $pull: {
            forumCoreTeamMembers: 
               { studentID: mongoose.Types.ObjectId(studentID) },
            
          },
        }
      );
    } else {
      await forums.updateOne(
        { name: forumName },
        {
          $pull: {
            forumMembers: mongoose.Types.ObjectId(studentID),
          },
        }
      );
    }
    res.json(response("User Deleted", process.env.SUCCESS_CODE));

  } catch (error) {
    console.log(error);
    res.json(response("Cannot delete the member", process.env.FAILURE_CODE));
  }
};

const forumViewCard = async (req, res) => {
  try {
    let { id } = req.body;
    let forum = await forums
      .findOne({ _id: id })
      .populate("facultyCoordinatorID");
    res.json(response(forum, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

module.exports = {
  dashboard,
  getForumsList,
  deleteforumMember,
  addNewForumMembers,
  addNewCoreForumMember,
  getCoreForumMembers,
  getForumMembers,
  getEquipments,
  editForum,
  forumEventNumber,
  updateProfile,
  forumViewCard,
};
