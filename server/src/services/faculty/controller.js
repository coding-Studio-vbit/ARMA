const escapeRegex = require("../util/escapeRegex");
const bcrypt = require("bcrypt");
const facultyModel = require("../../models/faculty");
const faculty = require("../../models/faculty");
const roles = require("../../models/role");
const events = require("../../models/event");
const response = require("../util/response");
const mailer = require("../util/mailer");
const {
  budgetAcceptedForumUpdateTemplate,
  budgetUpdatedTemplate,
  budgetRejectedForumTemplate,
  budgetRejectedSACTemplate,
  SACApprovedTemplate,
  SACCommentedTemplate,
  SACRejectedTemplate,
  newEventFO,
  newEventCFI,
  newEventRegistrar,
} = require("../../email_templates/templates");
const mongoose = require("mongoose");
const forums = require("../../models/forum");
const students = require("../../models/student");
const reservations = require("../../models/reservations");

//get Faculty list

const getFacultyList = async (req, res) => {
  let page = Math.max(Number(req.query.page) || 1, 1);
  let limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  //For filters
  let where = {};
  if (req.query.name) where.name = { $regex: escapeRegex(req.query.name), $options: "i" };
  if (req.query.rollNumber)
    where.rollNumber = { $regex: escapeRegex(req.query.rollNumber), $options: "i" };

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    const result = await faculty
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await faculty.countDocuments(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response(
        { message: "Faculty data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const editProfile = async (req, res) => {
  try {
    const { designation, phone, newPassword } = req.body;
    const email = (req.user && req.user.email) ? req.user.email : req.body.email;
    let user = {};
    if(newPassword !== null)
    {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUNDS));
      const newHash = await bcrypt.hash(newPassword, salt);
      user = await faculty
      .findOneAndUpdate(
        { email: email },
        { $set: { designation: designation, phone: phone, password: newHash } },
        { new: true }
      )
      .populate("role")
      .select("-password");
    }
    else{
      user = await faculty
      .findOneAndUpdate(
        { email: email },
        { $set: { designation: designation, phone: phone } },
        { new: true }
      )
      .populate("role")
      .select("-password");
    }
     
    res.json(response(user, process.env.SUCCESS_CODE));
  } catch (error) {
    res.json(
      response("Details could not be updated", process.env.FAILURE_CODE)
    );
  }
};

const editFaculty = async (req, res) => {
  try {
    const { id, name, designation, role } = req.body;

    //Always ensure that there is only one SAC, one MO,one Registrar, One CFI and one FO only.

    const singletonRoles = ["SAC", "FO", "MO", "REGISTRAR", "CFI"];
    for (let i = 0; i < singletonRoles.length; i++) {
      const roleName = singletonRoles[i];
      const currentRole = await roles.findOne({ name: roleName });
      if (!currentRole) throw new Error(`Role ${roleName} cannot be found!`);
      const currentFacultyWithRole = await faculty.findOne({
        role: currentRole._id,
      });
      if (
        currentFacultyWithRole &&
        role.find((x) => String(x) == String(currentRole._id))
      ) {
        currentFacultyWithRole.role = currentFacultyWithRole.role.filter(
          (v) => String(currentRole._id) !== String(v)
        );
        await currentFacultyWithRole.save();
      }
    }

    await faculty.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, designation: designation, role: role } },
      { new: true }
    );
    res.json(
      response("Faculty Details edited successfully!", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const fetchFaculty = async (req, res) => {
  try {
    let { name } = req.body;
    const safeName = escapeRegex(name || "");
    let fac = await faculty
      .find({
        name: { $regex: `^${safeName}`, $options: "i" },
      })
      .select("-password")
      .limit(50);
    res.json(response(fac, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const viewFaculty = async (req, res) => {
  try {
    let { id } = req.body;
    let faculty = await facultyModel.findOne({ _id: id }).select("-password").populate("role");
    res.json(response(faculty, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const deleteFaculty = async (req, res) => {
  try {
    let { id } = req.body;
    let faculty = await facultyModel.deleteOne({ _id: id });
    res.json(response(faculty, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const acceptBudget = async (req, res) => {
  try {
    let { eventId } = req.body;
    let event = await events.findById(eventId).populate("forumID");
    const SACRoleId = await roles.findOne({ name: "SAC" });
    if (SACRoleId == null) throw new Error("SAC Role not found");
    const SAC = await faculty.findOne({ role: SACRoleId._id });
    if (SAC == null) throw new Error("SAC not found");
    if (
      event.eventStatus !== "AWAITING FO APPROVAL" &&
      event.eventStatus !== "CHANGES REQUESTED BY FO"
    ) {
      throw new Error(
        "cannot accept budget of event during the current status:" +
          event.eventStatus
      );
    }
    //ADD THIS EVENT AS ORGANISED TO ALL THE FORUM STUDENTS ATOMICALLY.
    await students.updateMany(
      { "forumCoreTeamMemberships.forumId": event.forumID._id },
      { $addToSet: { eventsOrganized: event._id } }
    );

    event.eventStatus = "APPROVED";
    await event.save();
    //now send update email to both the forum and the SAC.
    await mailer.sendMail(event.forumID.email, budgetAcceptedForumUpdateTemplate, {
      eventName: event.name,
    });
    res.json(
      response("Accepted budget successfully.", process.env.SUCCESS_CODE)
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const commentBudget = async (req, res) => {
  try {
    const { eventId, FOComments } = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if (
      event.eventStatus !== "AWAITING FO APPROVAL" &&
      event.eventStatus !== "CHANGES REQUESTED BY FO"
    ) {
      throw new Error(
        "cannot comment for current status of event:" + event.eventStatus
      );
    }
    event.FOComments = FOComments;
    event.eventStatus = "CHANGES REQUESTED BY FO";
    await event.save();
    //send the mail to the forum about the comments.
    await mailer.sendMail(event.forumID.email, budgetUpdatedTemplate, {
      eventName: event.name,
    });
    res.json(
      response(
        "Successfully commented on the budget",
        process.env.SUCCESS_CODE
      )
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const rejectBudget = async (req, res) => {
  try {
    let { eventId, FOComments } = req.body;
    let event = await events.findById(eventId).populate("forumID");
    const SACRoleId = await roles.findOne({ name: "SAC" });
    if (SACRoleId == null) throw new Error("SAC Role not found");
    const SAC = await faculty.findOne({ role: SACRoleId._id });
    if (SAC == null) throw new Error("SAC not found");
    if (
      event.eventStatus !== "AWAITING FO APPROVAL" &&
      event.eventStatus !== "CHANGES REQUESTED BY FO"
    ) {
      throw new Error("not AWAITING FO APPROVAL");
    }

    event.eventStatus = "REJECTED BY FO";
    event.FOComments = FOComments;
    //now send update email to both the forum and the SAC.
    await event.save();
    await mailer.sendMail(event.forumID.email, budgetRejectedForumTemplate, {
      eventName: event.name,
    });
    await mailer.sendMail(SAC.email, budgetRejectedSACTemplate, {
      eventName: event.name,
      forumName: event.forumID.name,
    });
    res.json(
      response("budget rejected successfully.", process.env.SUCCESS_CODE)
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const approveEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if (
      event.eventStatus !== "AWAITING SAC APPROVAL" &&
      event.eventStatus !== "CHANGES REQUESTED BY SAC"
    ) {
      throw new Error("cannot approve event during current status");
    }

      const CFIRole = await roles.findOne({ name: "CFI" });
      if (!CFIRole) throw new Error("No CFI role found!");
      const RegistrarRole = await roles.findOne({ name: "REGISTRAR" });
      if (!RegistrarRole) throw new Error("No Registrar role found!");
      const CFI = await faculty.findOne({ role: CFIRole._id });
      if (!CFI) throw new Error("No CFI found!");
      const Registrar = await faculty.findOne({ role: RegistrarRole._id });
      if (!Registrar) throw new Error("No Registrar found!");

    if (event.hasBudget) {
      //send a mail to the FO.
      event.eventStatus = "AWAITING FO APPROVAL";
      const FORole = await roles.findOne({ name: "FO" });
      if (!FORole) throw new Error("No FO role found!");

      const FO = await faculty.findOne({ role: FORole._id });
      if (!FO) throw new Error("No FO found!");

      mailer.sendMail(FO.email, newEventFO, {
        FOName: FO.name,
        eventName: event.name,
        forumName: event.forumID.name,
      });
      mailer.sendMail(Registrar.email, newEventRegistrar, {
        FOName: Registrar.name,
        eventName: event.name,
        forumName: event.forumID.name,
      });
      mailer.sendMail(CFI.email, newEventCFI, {
        FOName: CFI.name,
        eventName: event.name,
        forumName: event.forumID.name,
      });
    } else {
      await students.updateMany(
        { "forumCoreTeamMemberships.forumId": event.forumID._id },
        { $addToSet: { eventsOrganized: event._id } }
      );
      event.eventStatus = "APPROVED";
    }
    await event.save();
    //send mail to the forum.
    await mailer.sendMail(event.forumID.email, SACApprovedTemplate, {
      eventName: event.name,
    });
    res.json(
      response("successfully approved the event", process.env.SUCCESS_CODE)
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const commentEvent = async (req, res) => {
  try {
    const { eventId, SACComments } = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if (
      event.eventStatus !== "AWAITING SAC APPROVAL" &&
      event.eventStatus !== "CHANGES REQUESTED BY SAC"
    ) {
      throw new Error("cannot comment on event during current status");
    }
    event.eventStatus = "CHANGES REQUESTED BY SAC";
    event.SACComments = SACComments;
    await event.save();

    await mailer.sendMail(event.forumID.email, SACCommentedTemplate, {
      eventName: event.name,
    });
    res.json(
      response(
        "successfully commented on the event",
        process.env.SUCCESS_CODE
      )
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

const rejectEvent = async (req, res) => {
  try {
    const { eventId, SACComments } = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if (
      event.eventStatus !== "AWAITING SAC APPROVAL" &&
      event.eventStatus !== "CHANGES REQUESTED BY SAC"
    ) {
      throw new Error("cannot reject event during current status");
    }
    //delete this event's reservations
    await reservations.deleteMany({ eventId: eventId });
    event.eventStatus = "REJECTED BY SAC";
    event.SACComments = SACComments;
    await event.save();

    await mailer.sendMail(event.forumID.email, SACRejectedTemplate, {
      eventName: event.name,
    });
    res.json(
      response("successfully rejected the event", process.env.SUCCESS_CODE)
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

module.exports = {
  getFacultyList,
  editProfile,
  editFaculty,
  fetchFaculty,
  deleteFaculty,
  viewFaculty,
  acceptBudget,
  commentBudget,
  rejectBudget,
  approveEvent,
  commentEvent,
  rejectEvent,
};
