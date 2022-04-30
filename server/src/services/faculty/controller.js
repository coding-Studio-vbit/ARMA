const facultyModel = require("../../models/faculty");
const faculty = require("../../models/faculty");
const events = require("../../models/event");
const response = require("../util/response");
const mailer = require("../util/mailer");
const {budgetAcceptedForumUpdateTemplate, budgetAcceptedSACUpdateTemplate, budgetUpdatedTemplate, budgetRejectedTemplate, budgetRejectedForumTemplate, budgetRejectedSACTemplate, SACApprovedTemplate, SACCommentedTemplate, SACRejectedTemplate} = require("../../email_templates/templates");  
const mongoose = require("mongoose");

//get Faculty list

const getFacultyList = async (req, res) => {
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;
  //For filters
  let where = {};
  if (req.query.name) where.name = { $regex: req.query.name, $options: "i" };
  if (req.query.rollNumber)
    where.rollNumber = { $regex: req.query.rollNumber, $options: "i" };

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await faculty
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await faculty.count(where);
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
    const { email, designation, phone } = req.body;
    const user = await faculty
      .findOneAndUpdate(
        { email: email },
        { $set: { designation: designation, phone: phone } },
        { new: true }
      )
      .populate("role")
      .select("-password");
    res.json(response(user, process.env.SUCCESS_CODE));
  } catch (error) {
    res.json(
      response("Details could not be updated", process.env.FAILURE_CODE)
    );
  }
};

const editFaculty = async (req, res) => {
  try {
    const { id, name, designation, roles } = req.body;
    await faculty.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, designation: designation, role: roles } },
      { new: true }
    );
    res.json(
      response("Faculty Details edited successfully!", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const fetchFaculty = async (req, res) => {
  try {
    let { name } = req.body;
    console.log(name);
    let fac = await faculty.find({
      name: { $regex: `^${name}`, $options: "i" },
    });
    res.json(response(fac, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
};

const viewFaculty = async (req, res) => {
  try {
    let { id } = req.body;
    let faculty = await facultyModel.findOne({ _id: id }).populate("role");
    res.json(response(faculty, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const deleteFaculty = async (req, res) => {
  try {
    let { id } = req.body;
    let faculty = await facultyModel.deleteOne({ _id: id });
    res.json(response(faculty, process.env.SUCCESS_CODE));
  } catch (err) {
    console.log(err);
    res.json(response(error, process.env.FAILURE_CODE));
  }
};

const acceptBudget = async (req, res) => {
  try{
    let {eventId} = req.body;
    let event = await events.findById(eventId).populate("forumID");
    const SACRoleId = await roles.findOne().where("name").in(["SAC"]);
    const SAC = faculty.findOne({ role: [SACRoleId._id] });

    if(event.eventStatus !== "AWAITING BUDGET APPROVAL" || event.eventStatus !== "BUDGET STATUS UPDATED" || event.eventStatus !== "REQUESTED BUDGET CHANGES")
    {
      throw new Error("cannot accept budget of event during the current status");
    }
    if(req.user.role.name == "FO")
    {
      event.eventStatus = "AWAITING SAC APPROVAL";
      //now send update email to both the forum and the SAC.
      await event.save();
      mailer.sendMail(event.forumID.email, budgetAcceptedForumUpdateTemplate, {eventName: event.name})
      .then(response=>{
        return mailer.sendMail(SAC.email, budgetAcceptedSACUpdateTemplate, {eventName: event.name, forumName: event.forumID.name});
      })
      .then(response=>{
        res.json(response("Accepted budget successfully.", process.env.SUCCESS_CODE));
      })
    }
    else
    {
      res.json(response("unauthorized", process.env.FAILURE_CODE));
    }
  }
  catch(err)
  {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
}

const commentBudget = async (req, res) => {
  try
  {
    const {eventId, FOComments} = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if(event.eventStatus !== "AWAITING BUDGET APPROVAL" || event.eventStatus !== "REQUESTED BUDGET CHANGES")
    {
      throw new Error("cannot comment for current status of event");
    }
    if(req.user.role.name == "FO")
    {
      event.FOComments = FOComments;
      event.eventStatus = "REQUESTED BUDGET CHANGES";
      await event.save();
      //send the mail to the forum about the comments.
      mailer.sendMail(event.forumID.email, budgetUpdatedTemplate, {eventName: event.name}).then(response=>{
        res.json(response("Successfully commented on the budget", process.env.SUCCESS_CODE));
      })
    }
    else
    {
      res.json(response("unauthorized", process.env.FAILURE_CODE));
    }
  }
  catch(err)
  {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE))
  }
}

const rejectBudget = async (req, res) => {
  try{
    let {eventId, FOComments} = req.body;
    let event = await events.findById(eventId).populate("forumID");
    let SAC = await faculty.findOne({role: mongoose.Schema.Types.ObjectId("61d29b056fe5397a01f615a9")})
    if(event.eventStatus !== "AWAITING BUDGET APPROVAL" || event.eventStatus !== "BUDGET CHANGES UPDATED" || event.eventStatus !== "REQUESTED BUDGET CHANGES")
    {
      throw new Error("not awaiting budget approval");
    }

    if(req.user.role.name == "FO")
    {
      event.eventStatus = "BUDGET REJECTED";
      event.FOComments = FOComments;
      //now send update email to both the forum and the SAC.
      await event.save();
      mailer.sendMail(event.forumID.email, budgetRejectedForumTemplate, {eventName: event.name})
      .then(response=>{
        return mailer.sendMail(SAC.email, budgetRejectedSACTemplate, {eventName: event.name, forumName: event.forumID.name});
      })
      .then(response=>{
        res.json(response("Accepted rejected successfully.", process.env.SUCCESS_CODE));
      })
    }
    else
    {
      res.json(response("unauthorized", process.env.FAILURE_CODE));
    }
  }
  catch(err)
  {
    console.log(err);
    res.json(response(err, process.env.FAILURE_CODE));
  }
}

const approveEvent = async (req, res)=>{
  try
  {
    const {eventId} = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if(event.eventStatus !== "AWAITING SAC APPROVAL" || event.eventStatus !== "REQUESTED CHANGES BY SAC" || event.eventStatus !== "SAC CHANGES UPDATED")
    {
      throw new Error("cannot approve event during current status");
    }
    if(req.user.role.name == "SAC")
    {
      event.eventStatus = "ACCEPTED";
      await event.save();

      mailer.sendMail(event.forumID.email, SACApprovedTemplate, {eventName: event.name})
      .then(response=>{
        res.json(response("successfully approved the event", process.env.SUCCESS_CODE));
      })
    }else
    {
      res.json(response("unauthorized", process.env.FAILURE_CODE))
    }
  }
  catch(err)
  {
    console.log(err);
    res.json(response("failed to approve event", process.env.FAILURE_CODE));
  }
}

const commentEvent = async (req, res)=>{
  try
  {
    const {eventId, SACComments} = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if(event.eventStatus !== "AWAITING SAC APPROVAL" || event.eventStatus !== "REQUESTED CHANGES BY SAC" || event.eventStatus !== "SAC CHANGES UPDATED")
    {
      throw new Error("cannot comment on event during current status");
    }
    if(req.user.role.name == "SAC")
    {
      event.eventStatus = "REQUESTED CHANGES BY SAC";
      event.SACComments = SACComments;
      await event.save();

      mailer.sendMail(event.forumID.email, SACCommentedTemplate, {eventName: event.name})
      .then(response=>{
        res.json(response("successfully commented on the event", process.env.SUCCESS_CODE));
      })
    }else
    {
      res.json(response("unauthorized", process.env.FAILURE_CODE))
    }
  }
  catch(err)
  {
    console.log(err);
    res.json(response("failed to comment on the event", process.env.FAILURE_CODE));
  }
}

const rejectEvent = async (req, res)=>{
  try
  {
    const {eventId, SACComments} = req.body;
    const event = await events.findById(eventId).populate("forumID");
    if(event.eventStatus !== "AWAITING SAC APPROVAL" || event.eventStatus !== "REQUESTED CHANGES BY SAC" || event.eventStatus !== "SAC CHANGES UPDATED")
    {
      throw new Error("cannot reject event during current status");
    }
    if(req.user.role.name == "SAC")
    {
      event.eventStatus = "REJECTED";
      event.SACComments = SACComments;
      await event.save();

      mailer.sendMail(event.forumID.email, SACRejectedTemplate, {eventName: event.name})
      .then(response=>{
        res.json(response("successfully rejected the event", process.env.SUCCESS_CODE));
      })
    }else
    {
      res.json(response("unauthorized", process.env.FAILURE_CODE))
    }
  }
  catch(err)
  {
    console.log(err);
    res.json(response("failed to reject the event", process.env.FAILURE_CODE));
  }
}


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
