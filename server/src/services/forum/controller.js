const escapeRegex = require("../util/escapeRegex");

const getCallerForumName = (req, fallbackName) => {
  const isForum = Array.isArray(req.user?.role) && req.user.role.some(r => r.name === "FORUM");
  if (isForum && req.user.name) {
    return req.user.name;
  }
  return fallbackName;
};
const events = require("../../models/event");
const forums = require("../../models/forum");
const reservations = require("../../models/reservations");
const response = require("../util/response");
const base64 = require("../util/base64");
const bcrypt = require("bcrypt");
const fs = require("fs");
const students = require("../../models/student");
const equipments = require("../../models/equipment");
const facultyModel = require("../../models/faculty");
const path = require("path");
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
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};
const getEquipments = async (req, res) => {
  try {
    let myEquip = await equipments.find({});
    res.json(response(myEquip, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const getForumsList = async (req, res) => {
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  let where = {};
  if (req.query.name) where.name = { $regex: escapeRegex(req.query.name), $options: "i" };

  let sort = {};
  if (req.query.orderBy && req.query.order) sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    const result = await forums
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .populate("facultyCoordinatorID")
      .select("-password");
    const total = await forums.countDocuments(where);
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
    const { forumName: bodyForumName, ...stuser } = req.body;
    const forumName = getCallerForumName(req, bodyForumName);
    let stu = await students.findOne({ rollNumber: stuser.rollNumber });
    const forum = await forums.findOne({ name: forumName });
    let studentExists;
    if (stu) {
      //check if student is already a member of the forum.
      studentExists = stu.forumNonCoreTeamMemberships.find(
        (v) => v.toString() === forum._id.toString()
      );
    }

    if (studentExists) throw new Error("Student already exists");
    if (stu) {
      stu.forumNonCoreTeamMemberships.push(forum._id);
      await stu.save();
    } else {
      let student = new students(stuser);
      student.forumNonCoreTeamMemberships = [forum._id];
      await student.save();
    }
    res.json(response("New Forum Member Added", process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const addNewCoreForumMember = async (req, res) => {
  try {
    const { forumName: bodyForumName, designation, ...stuser } = req.body;
    const forumName = getCallerForumName(req, bodyForumName);
    let stu = await students.findOne({ rollNumber: stuser.rollNumber });
    const forum = await forums.findOne({ name: forumName });

    if (stu) {
      //check if the student is already a core team member of this forum.
      const membershipExists = stu.forumCoreTeamMemberships.find((v) => {
        return (
          v.forumId.toString() === forum._id.toString() &&
          v.designation == designation
        );
      });

      if (membershipExists) throw new Error("Membership exists");
      stu.forumCoreTeamMemberships.push({
        forumId: forum._id,
        designation: designation,
      });
      await stu.save();
    } else {
      let student = new students(stuser);
      student.forumCoreTeamMemberships = [
        {
          forumId: forum._id,
          designation: designation,
        },
      ];
      await student.save();
    }
    res.json(response("New Core Forum Member Added", process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const getCoreForumMembers = async (req, res) => {
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  let where = {};
  if (req.query.name) where.name = req.query.name;

  let sort = {};
  if (req.query.orderBy && req.query.order) sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    const forum = await forums.findOne({ name: req.query.name });
    if (!forum) throw new Error(`Forum ${req.query.name} not found!`);
    const filter = { "forumCoreTeamMemberships.forumId": forum._id };
    const result = await students
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .populate({
        path: "forumCoreTeamMemberships.forumId",
      });
    const total = await students.countDocuments(filter);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
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
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  let where = {};
  if (req.query.name) where.name = req.query.name;

  let sort = {};
  if (req.query.orderBy && req.query.order) sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    const forum = await forums.findOne({ name: req.query.name });
    if (!forum) throw new Error(`Forum ${req.query.name} not found!`);
    const filter = { forumNonCoreTeamMemberships: forum._id };
    const result = await students
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await students.countDocuments(filter);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
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
    res.json(response(err.message, process.env.FAILURE_CODE));
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
      .countDocuments();
    res.json(response(result, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const updateProfile = async (req, res) => {
  try {
    const { description, newPassword } = req.body;
    const targetEmail = req.user.email; // Enforce caller identity
    let user = {};
    if(newPassword)
    {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS || "10"));
      const newHash = await bcrypt.hash(newPassword, salt);
      user = await forums
      .findOneAndUpdate(
        { email: targetEmail },
        { $set: { description: description, password: newHash } },
        { new: true }
      ) 
      .populate("facultyCoordinatorID name")
      .populate("role");
    }
    else
    {
      user = await forums
      .findOneAndUpdate(
        { email: targetEmail },
        { $set: { description: description } },
        { new: true }
      )
      .populate("facultyCoordinatorID name")
      .populate("role");
    }
    if (user && user.password) user.password = undefined;
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
    const { forumName: bodyForumName, studentID, userType } = req.body;
    const forumName = getCallerForumName(req, bodyForumName);
    const forum = await forums.findOne({ name: forumName });
    if (userType === "core") {
      if (!forum) throw new Error(`Forum ${forumName} couldn't be found!`);
      await students.updateOne(
        { _id: studentID },
        {
          $pull: {
            forumCoreTeamMemberships: {
              forumId: forum._id,
            },
          },
        }
      );
    } else {
      await students.updateOne(
        { _id: studentID },
        {
          $pull: {
            forumNonCoreTeamMemberships: forum._id,
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
    
    res.json(response(forum, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
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
          if (doc.profilePictureFilePath && !doc.profilePictureFilePath.startsWith("http") && fs.existsSync(doc.profilePictureFilePath))
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
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const getProfilePicture = async (req, res) => {
  //console.log(req);
  try {
    const myForum = await forums.findOne({ email: req.user.email });
    console.log(typeof req.user.userType);
    if (
      typeof req.user.userType == "object" &&
      req.user.userType.find(
        (v) => v.name == "SAC" || v.name == "FACULTY" || v.name == "FO"
      )
    )
      return res.json(response(undefined, process.env.SUCCESS_CODE));
    if (myForum.profilePictureFilePath == undefined)
      res.json(
        response(
          base64.encode(path.join(__dirname, "cs.png")),
          process.env.SUCCESS_CODE
        )
      );
    else if (myForum.profilePictureFilePath.startsWith("http")) {
      res.json(
        response(
          myForum.profilePictureFilePath,
          process.env.SUCCESS_CODE
        )
      );
    } else {
      res.json(
        response(
          base64.encode(myForum.profilePictureFilePath),
          process.env.SUCCESS_CODE
        )
      );
    }
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
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
          if (doc.dashboardCoverFilePath && !doc.dashboardCoverFilePath.startsWith("http") && fs.existsSync(doc.dashboardCoverFilePath))
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
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const getDashboardCover = async (req, res) => {
  //console.log(req);
  try {
    const myForum = await forums.findOne({ email: req.user.email });
    if (myForum.dashboardCoverFilePath == undefined)
      res.sendFile("sky.jpg", { root: __dirname });
    else if (myForum.dashboardCoverFilePath.startsWith("http")) {
      res.json(
        response(
          myForum.dashboardCoverFilePath,
          process.env.SUCCESS_CODE
        )
      );
    } else {
      try {
        const thisFile = fs.readFileSync(myForum.dashboardCoverFilePath);
        res.json(
          response(
            base64.encode(myForum.dashboardCoverFilePath),
            process.env.SUCCESS_CODE
          )
        );
      } catch (error) {
        res.sendFile("sky.jpg", { root: __dirname });
      }
    }
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const viewForum = async (req, res) => {
  try {
    let { id } = req.body;
    let forum = await forums
      .findOne({ _id: id })
      .populate("facultyCoordinatorID")
      .populate("forumHeads");
    res.json(response(forum, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const deleteForum = async (req, res) => {
  try {
    let { id } = req.body;
    let forum = await forums.deleteOne({ _id: id });
    res.json(response(forum, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
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
