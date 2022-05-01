const { welcomeTemplate } = require("../../email_templates/templates");
const events = require("../../models/event");
const forums = require("../../models/forum");
const reservations = require("../../models/reservations");
const response = require("../util/response");
const base64 = require("../util/base64");
const fs = require("fs");
const students = require("../../models/student");
const equipments = require("../../models/equipment");
const facultyModel = require("../../models/faculty");
const { populate } = require("../../models/forum");
const mongoose = require("mongoose");
const dashboard = async (req, res) => {
  try {
    let myEvents = await events.find({ forumID: req.user._id });
    let currentDate = new Date();
    let dateString =
      currentDate.getDate() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear();
    let activeEvents = await reservations
      .find({ status: "NOT COMPLETED", dates: dateString })
      .populate({ path: "eventId", select: { name: 1 } });

    let statistics = { engagement: 4, total: myEvents.length };
    res.json(
      response(
        {
          events: myEvents,
          statistics: statistics,
          activeEvents: activeEvents.map((item) => {
            return item.eventId.name;
          }),
        },
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
      .populate("facultyCoordinatorID")
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
    let studentExists;
    if (stu) {
      studentExists = forum.forumMembers.find(
        (v) => v.toString() === stu._id.toString()
      );
    }

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
      .select("-password")
      .populate({
        path: "forumCoreTeamMembers",
        populate: { path: "studentID" },
      });
    // [0,1,2,3,4,5,6,7,8,9,10]
    const mem = result.forumCoreTeamMembers.slice(
      limit * (page - 1),
      limit * page
    );
    console.log(limit * (page - 1));
    console.log(result);
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
        eventStatus: { $in: ["APPROVED"] },
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
      await forums.updateOne(
        { name: forumName },
        {
          $pull: {
            forumCoreTeamMembers: {
              studentID: mongoose.Types.ObjectId(studentID),
            },
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
      .populate("facultyCoordinatorID")
      .populate({
        path: "events",
        match: { eventStatus: "COMPLETED" },
        populate: { path: "attendanceDocID" },
      });
    forum = forum.toObject();
    for (let i = 0; i < forum.events.length; i++) {
      forum.events[i].participants =
        forum.events[i].attendanceDocID.presence.length;
      let set = new Set();
      for (let j = 0; j < forum.events[i].halls.length; j++) {
        set.add(forum.events[i].halls[j].date);
      }
      forum.events[i]["duration"] = 3; //set.size
    }
    res.json(response(forum, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const imagePath = req.files.profilePicture[0].path;
    forums.findOneAndUpdate(
      { email: req.user.email },
      { profilePictureFilePath: imagePath },
      { returnDocument: "before" },
      (err, doc) => {
        if (err) {
          throw err;
        } else {
          if (doc.profilePictureFilePath)
            fs.unlinkSync(doc.profilePictureFilePath);
          res.json(
            response(
              "SUCCESSFULLY UPDATED FORUM PROFILE IMAGE",
              process.env.SUCCESS_CODE
            )
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const getProfilePicture = async (req, res) => {
  //console.log(req);
  try {
    const myForum = await forums.findOne({ email: req.user.email });
    if (myForum.profilePictureFilePath == undefined)
      res.sendFile("cs.png", { root: __dirname });
    else {
      res.json(
        response(
          base64.encode(myForum.profilePictureFilePath),
          process.env.SUCCESS_CODE
        )
      );
    }
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const uploadDashboardCover = async (req, res) => {
  try {
    const imagePath = req.files.dashboardCover[0].path;
    forums.findOneAndUpdate(
      { email: req.user.email },
      { dashboardCoverFilePath: imagePath },
      { returnDocument: "before" },
      (err, doc) => {
        if (err) {
          throw err;
        } else {
          if (doc.dashboardCoverFilePath)
            fs.unlinkSync(doc.dashboardCoverFilePath);
          res.json(
            response(
              "SUCCESSFULLY UPDATED DASHBOARD COVER IMAGE",
              process.env.SUCCESS_CODE
            )
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const getDashboardCover = async (req, res) => {
  //console.log(req);
  try {
    const myForum = await forums.findOne({ email: req.user.email });
    if (myForum.dashboardCoverFilePath == undefined)
      res.sendFile("sky.jpg", { root: __dirname });
    else
      res.json(
        response(
          base64.encode(myForum.dashboardCoverFilePath),
          process.env.SUCCESS_CODE
        )
      );
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const viewForum = async (req, res) => {
  try {
    let { id } = req.body;
    let forum = await forums.findOne({ _id: id });
    res.json(response(forum, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const deleteForum = async (req, res) => {
  try {
    let { id } = req.body;
    let forum = await forums.deleteOne({ _id: id });
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
  uploadProfilePicture,
  getProfilePicture,
  uploadDashboardCover,
  getDashboardCover,
  viewForum,
  deleteForum,
};
