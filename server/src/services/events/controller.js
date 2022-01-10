const events = require("../../models/event");
const response = require("../util/response");
const attendance = require("../../models/attendance");
const roles = require("../../models/role");
const mailer = require("../util/mailer");
const { budgetDocUpdateTemplate } = require("../../email_templates/templates");

const getEvents = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.forumID) where.forumID = req.query.forumID;
  if (req.query.eventStatus) where.eventStatus = req.query.eventStatus;

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await events
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await events.count(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response({ message: "event data fetch error" }, process.env.FAILURE_CODE)
    );
  }
};

const createEvent = async (req, res) => {
  try {
    let newAttendanceDoc = new attendance();
    let newEvent = new events({
      forumID: req.user._id,
      name: req.body.name,
      description: req.body.description,
      eventProposalDocPath: req.files.eventDocument[0].path,
      budgetDocPath: req.files.budgetDocument[0].path,
      hasBudget: req.files.budgetDocument !== null,
    });
    newAttendanceDoc.eventID = String(newEvent._id);
    newEvent.attendanceDocID = String(newAttendanceDoc._id);
    await newAttendanceDoc.save();
    await newEvent.save();
    res.json(
      response({ message: "new event created" }, process.env.SUCCESS_CODE)
    );
  } catch (e) {
    console.log(e);
    res.json(response({ message: "error" }, process.env.FAILURE_CODE));
  }
};

const updateBudgetDoc = async (req, res) => {
  //update the budget here.
  console.log(req.files);
  try {
    let event = await events.findById(req.body.eventID);
    event.budgetDocPath = req.files.budgetDocument[0].path;
    await event.save();
    //send notif to FO.
    const FORoleID = await roles.findOne({ name: "FO" });
    const FO = faculty.findOne({ roles: [FORoleID._id] });
    await mailer.sendMail(element.email, budgetDocUpdateTemplate, {
      FOName: FO,
      forumName: req.user.name,
      eventName: event.name
    });
    res.json(response("updated budget document", process.env.SUCCESS_CODE));
  } catch (e) {
    console.log(e);
    res.json(
      response("updated budget document failed", process.env.FAILURE_CODE)
    );
  }
};

module.exports = { getEvents, createEvent, updateBudgetDoc };
