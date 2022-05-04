const events = require("../../models/event");
const faculty = require("../../models/faculty");
const reservations = require("../../models/reservations");
const response = require("../util/response");
const attendance = require("../../models/attendance");
const roles = require("../../models/role");
const mailer = require("../util/mailer");
const fs = require("fs");
const {
  budgetDocUpdateTemplate,
  newEventCreatedForum,
  newEventCreatedFO,
  newEventCreatedSAC,
  MOReportAndMedia,
} = require("../../email_templates/templates");
const students = require("../../models/student");
const equipments = require("../../models/equipment");
const halls = require("../../models/hall");
const mongoose = require("mongoose");
const facultyModel = require("../../models/faculty");
const attendances = require("../../models/attendance");

const getEvents = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;

  //For filters
  let where = {};
  if (req.query.forumID) where.forumID = req.query.forumID;
  if (req.query.hasBudget) {
    where.hasBudget = req.query.hasBudget;
    where.eventStatus = [
      "AWAITING FO APPROVAL",
      "REQUESTED BUDGET CHANGES",
      "BUDGET UPDATED",
      "BUDGET REJECTED",
    ];
  }
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
      .sort(sort)
      .populate({
        path: "forumID",
        select: "name facultyCoordinatorID",
        model: "forums",
        populate: {
          path: "facultyCoordinatorID",
          select: "name",
          model: "faculty",
        },
      });
    if (req.query.forumName) {
      result = result.filter((e) => {
        if (e.forumID.name.includes(req.query.forumName)) {
          return e;
        }
      });
    }
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
    // Create a new attendance document for this event.
    let { eventDetails, eventHalls, equipmentList } = req.body;
    equipmentList = JSON.parse(equipmentList);
    eventHalls = JSON.parse(eventHalls);
    eventDetails = JSON.parse(eventDetails);
    let newAttendanceDoc = new attendance();
    // Set the required equipment array
    let eqs = [];
    for (let i = 0; i < equipmentList.length; i++) {
      let { equipment, quantity } = equipmentList[i];
      quantity = Number(quantity);
      let eq = await equipments.findOne({
        name: { $regex: `^${equipment}`, $options: "i" },
      });
      eqs.push({ equipmentType: eq._id, quantity: quantity });
    }
    let newEvent = {};
    if (req.files.budgetDocument) {
      newEvent = new events({
        forumID: req.user._id,
        description: eventDetails.desc,
        name: eventDetails.name,
        eventProposalDocPath: req.files.eventDocument[0].path,
        eventStatus: "AWAITING FO APPROVAL",
        budgetDocPath: req.files.budgetDocument[0].path,
        hasBudget: true,
        equipment: eqs,
      });
    } else {
      newEvent = new events({
        forumID: req.user._id,
        description: eventDetails.desc,
        name: eventDetails.name,
        eventProposalDocPath: req.files.eventDocument[0].path,
        budgetDocPath: null,
        eventStatus: "AWAITING SAC APPROVAL",
        hasBudget: false,
        equipment: eqs,
      });
    }

    newAttendanceDoc.eventID = String(newEvent._id);
    newEvent.attendanceDocID = String(newAttendanceDoc._id);

    // // Create reservations.
    // /**
    //  *  [
    //  *   {
    //  *     HallID: hallID,
    //  *     dates: ["2-3-2022", "3-3-2022"]
    //  *     timeSlots: [["MORNING", "AFTERNOON"], ["MORNING"]]
    //  *   }
    //  *  ]
    //  */

    let reservationsObject = {};
    let datesList = Object.keys(eventHalls);
    newEvent.eventDates = datesList;
    let HallsList = new Set();

    for (let i = 0; i < datesList.length; i++) {
      for (let j = 0; j < eventHalls[datesList[i]].halls.length; j++) {
        let info = eventHalls[datesList[i]].halls[j].split(".");
        let slot = info[0];
        let hall = await halls.findOne({
          name: { $regex: `^${info[1]}`, $options: "i" },
        });
        if (reservationsObject[String(hall._id)]) {
          if (reservationsObject[String(hall._id)][datesList[i]]) {
            reservationsObject[String(hall._id)][datesList[i]].push(slot);
          } else {
            reservationsObject[String(hall._id)][datesList[i]] = [slot];
          }
        } else {
          reservationsObject[String(hall._id)] = {};
          reservationsObject[String(hall._id)][datesList[i]] = [slot];
        }
        HallsList.add(String(hall._id));
      }
    }
    //console.log("reservationsObject is", reservationsObject);
    let reservationsList = [];
    HallsList = [...HallsList];
    for (let i = 0; i < HallsList.length; i++) {
      reservationsList.push({
        HallID: HallsList[i],
        dates: Object.keys(reservationsObject[HallsList[i]]).map((date) => {
          const temp = new Date(date);
          return `${temp.getDate()}-${
            temp.getMonth() + 1
          }-${temp.getFullYear()}`;
        }),
        timeSlots: Object.keys(reservationsObject[HallsList[i]]).map((date) => {
          return reservationsObject[HallsList[i]][date];
        }),
      });
    }
    const eventReservations = reservationsList;
    eventReservations.forEach(async (obj) => {
      //first check if the dates are valid
      //see if an already reserved date is being booked again.
      const currentReservations = await reservations.find({
        status: "NOT COMPLETED",
        hallId: obj.HallID,
      });
      const blocked = [];

      currentReservations.forEach((r) => {
        for (let i = 0; i < r.dates.length; i++) {
          for (let j = 0; j < r.timeSlots[i].length; j++) {
            blocked.push(r.dates[i] + "." + r.timeSlots[i][j]);
          }
        }
      });
      eventReservations.forEach((r) => {
        for (let i = 0; i < r.dates.length; i++) {
          for (let j = 0; j < r.timeSlots[i].length; j++) {
            d = r.dates[i] + "." + r.timeSlots[i][j];
            if (blocked.indexOf(d) !== -1) {
              throw new Error("Invalid dates");
            }
          }
        }
      });

      const record = new reservations();
      record.hallId = obj.HallID;
      record.forumId = req.user._id;
      record.status = "NOT COMPLETED";
      record.eventId = newEvent._id;
      record.dates = obj.dates;
      record.timeSlots = obj.timeSlots;
      await record.save();
    });

    await newAttendanceDoc.save();
    await newEvent.save();

    let res = await mailer.sendMail(req.user.email, newEventCreatedForum, {
      forumName: req.user.name,
      eventName: eventDetails.name,
    });
    if (newEvent.hasBudget) {
      const FORoleID = await roles.findOne().where("name").in(["FO"]);
      const FO = await faculty.findOne({ role: FORoleID._id });
      res = await mailer.sendMail(FO.email, newEventCreatedFO, {
        forumName: req.user.name,
        eventName: eventDetails.name,
        FOName: FO.name,
      });
    } else {
      const SACRoleID = await roles.findOne().where("name").in(["SAC"]);
      const SAC = await faculty.findOne({ role: SACRoleID._id });
      res = await mailer.sendMail(SAC.email, newEventCreatedSAC, {
        forumName: req.user.name,
        eventName: eventDetails.name,
        SACName: SAC.name,
      });
    }

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
  try {
    let event = await events.findById(req.body.eventID).populate("forumID");
    if (
      event.eventStatus !== "AWAITING FO APPROVAL" &&
      event.eventStatus !== "BUDGET UPDATED" &&
      event.eventStatus !== "REQUESTED BUDGET CHANGES"
    )
      throw new Error("Cannot update budget during current status of event");
    event.budgetDocPath = req.files.budgetDocument[0].path;
    event.eventStatus = "BUDGET UPDATED";
    await event.save();
    //send notif to FO.
    const FORoleID = await roles.findOne().where("name").in(["FO"]);
    const FO = await faculty.findOne({ role: FORoleID._id });
    if (FO == null) throw new error("FO not found");
    await mailer.sendMail(FO.email, budgetDocUpdateTemplate, {
      FOName: FO.name,
      forumName: event.forumID.name,
      eventName: event.name,
    });
    res.json(response("updated budget document", process.env.SUCCESS_CODE));
  } catch (e) {
    console.log(e);
    res.json(
      response("updated budget document failed", process.env.FAILURE_CODE)
    );
  }
};

const reportAndMedia = async (req, res) => {
  try {
    console.log(req.body.eventID + "is the event id");
    let event = await events.findById(req.body.eventID).populate("forumID");
    const MORole = await roles.findOne({ name: "MO" });
    if (MORole == null) throw new Error("MO Role not found!");
    const MO = await faculty.findOne({ role: MORole._id });
    if (MO == null) throw new Error("MO not found!");

    event.reportDocPath = req.files.eventReport[0].path;

    let temp = [];
    for (let p = 0; p < req.files.eventImages.length; p++) {
      temp.push(req.files.eventImages[p].path);
    }
    event.mediaFilePaths = temp;

    await event.save();
    temp.push(event.reportDocPath);
    await mailer.sendMail(
      MO.email,
      MOReportAndMedia,
      { forumName: event.forumID.name, MOName: MO.name, eventName: event.name },
      temp.map((fp) => {
        return {
          fileName: fp,
          path: fp,
        };
      })
    );
    res.json(
      response("updated Event Report and Media files", process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const uploadRegistrantsList = async (req, res) => {
  let attendedEvents = req.query.attendedEvents;
  try {
    for (let i = 0; i < req.body.length; i++) {
      let data = req.body[i];
      let value = await students.findOne({ rollNumber: data.rollNumber });
      if (!value) {
        console.log(data);
        let newStudent = students(data);
        await newStudent.save();
      } else {
        await students.findOneAndUpdate(
          { rollNumber: data.rollNumber },
          { $addToSet: { attendedEvents: [data.attendedEvents] } }
        );
      }
    }
    let attendanceDoc = await attendance.findOne({ eventID: attendedEvents });
    let studentData = await students.find({ attendedEvents: attendedEvents });
    attendanceDoc.registrantsList = studentData;
    attendanceDoc.presence = studentData;
    await attendanceDoc.save();
    res.json(
      response(
        { message: "Students added successfully" },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Upload of Registrants failed" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const eventAttendance = async (req, res) => {
  console.log(req.query.eventID);
  try {
    const result = await attendance
      .findOne({ eventID: req.query.eventID })
      .populate({ path: "presence.studentId", model: "students" });
    if (result == null)
      throw new Error("Could not find the attendance document");
    const total = await attendance.count({ eventID: req.query.eventID });
    res.json(
      response(
        { data: result.presence, total: total },
        process.env.SUCCESS_CODE
      )
    );
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const postAttendance = async (req, res) => {
  try {
    let attendanceDoc = await attendance.findOne({ eventID: req.body.eventID });
    attendanceDoc.presence.forEach((element) => {
      element.dates = req.body.studentPresence[element._id];
    });
    await attendanceDoc.save();
    res.json(
      response({ message: "Attendance Updated" }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    console.log(error);
    res.json(
      response(
        { message: "Update Attendance Failed" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const getRequests = async (req, res) => {
  console.log(req.query.isFO);
  try {
    let result;
    if (req.query.isFO === "true") {
      console.log("htfkuyf,lig");
      result = await events
        .find({
          eventStatus: [
            "AWAITING FO APPROVAL",
            "REQUESTED BUDGET CHANGES",
            "BUDGET UPDATED",
          ],
        })
        .populate("forumID");
    } else {
      result = await events
        .find({ eventStatus: { $nin: ["COMPLETED", "REJECTED"] } })
        .populate("forumID");
    }
    res.json(response(result, process.env.SUCCESS_CODE));
    //console.log("Get",result);
  } catch (error) {
    console.log(error);
    res.json(
      response("Unable to Load the Dashboard", process.env.FAILURE_CODE)
    );
  }
};

const getCalendarEvents = async (req, res) => {
  try {
    const result = await events.find({ eventStatus: "APPROVED" });
    res.json(response(result, process.env.SUCCESS_CODE));
  } catch (error) {
    //console.log(error);
    res.json(
      response("Unable to Load the Dashboard", process.env.FAILURE_CODE)
    );
  }
};
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await events.findById(id).populate({
      path: "forumID",
      select: "name facultyCoordinatorID",
      populate: {
        path: "facultyCoordinatorID",
        select: "name",
      },
    });

    if (event) {
      res.json(response(event, process.env.SUCCESS_CODE));
    } else {
      res.json(response("No such event found", process.env.FAILURE_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(
      response("Unable to fetch the event info", process.env.FAILURE_CODE)
    );
  }
};

const getActiveEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const possibleEvents = await reservations
      .find({ status: "NOT COMPLETED" })
      .populate("forumId")
      .populate("eventId");
    const dateString = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const activeEvents = possibleEvents.filter((event) => {
      return event.dates.indexOf(dateString) !== -1;
    });
    res.json(response(activeEvents, process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    response("Failure", process.env.FAILURE_CODE);
  }
};

const getBudgetDocument = async (req, res) => {
  try {
    const forumId = req.user._id;
    const { id } = req.params;
    const event = await events.findById(id);
    if (event.forumID == forumId) {
      res.sendFile(event.budgetDocPath);
    } else {
      res.json(response("unauthorized", process.env.FAILURE_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(
      response("Failed to send budget document", process.env.FAILURE_CODE)
    );
  }
};

const getEventDocument = async (req, res) => {
  try {
    const forumId = req.user._id;
    const { id } = req.params;
    const event = await events.findById(id);
    if (event.forumID == forumId) {
      res.sendFile(event.eventProposalDocPath);
    } else {
      res.json(response("unauthorized", process.env.FAILURE_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const updateReservations = async (req, res) => {
  try {
    const { eventHalls, id } = req.body;
    const event = await events.findById(id);
    if (event.forumID == req.user._id && (event.eventStatus !== "APPROVED" && event.eventStatus !== "COMPLETED")) {
      //delete all reservations of this event.
      const deletionResult = await reservations.deleteMany({ eventId: id });
      let reservationsObject = {};
      let datesList = Object.keys(eventHalls);
      let HallsList = new Set();

      for (let i = 0; i < datesList.length; i++) {
        for (let j = 0; j < eventHalls[datesList[i]].halls.length; j++) {
          let info = eventHalls[datesList[i]].halls[j].split(".");
          let slot = info[0];
          let hall = await halls.findOne({
            name: { $regex: `^${info[1]}`, $options: "i" },
          });
          if (reservationsObject[String(hall._id)]) {
            if (reservationsObject[String(hall._id)][datesList[i]]) {
              reservationsObject[String(hall._id)][datesList[i]].push(slot);
            } else {
              reservationsObject[String(hall._id)][datesList[i]] = [slot];
            }
          } else {
            reservationsObject[String(hall._id)] = {};
            reservationsObject[String(hall._id)][datesList[i]] = [slot];
          }
          HallsList.add(String(hall._id));
        }
      }
      //console.log("reservationsObject is", reservationsObject);
      let reservationsList = [];
      HallsList = [...HallsList];
      for (let i = 0; i < HallsList.length; i++) {
        reservationsList.push({
          HallID: HallsList[i],
          dates: Object.keys(reservationsObject[HallsList[i]]).map((date) => {
            const temp = new Date(date);
            return `${temp.getDate()}-${
              temp.getMonth() + 1
            }-${temp.getFullYear()}`;
          }),
          timeSlots: Object.keys(reservationsObject[HallsList[i]]).map(
            (date) => {
              return reservationsObject[HallsList[i]][date];
            }
          ),
        });
      }
      const eventReservations = reservationsList;
      eventReservations.forEach(async (obj) => {
        //first check if the dates are valid
        //see if an already reserved date is being booked again.
        const currentReservations = await reservations.find({
          status: "NOT COMPLETED",
          hallId: obj.HallID,
        });
        const blocked = [];

        currentReservations.forEach((r) => {
          for (let i = 0; i < r.dates.length; i++) {
            for (let j = 0; j < r.timeSlots[i].length; j++) {
              blocked.push(r.dates[i] + "." + r.timeSlots[i][j]);
            }
          }
        });
        eventReservations.forEach((r) => {
          for (let i = 0; i < r.dates.length; i++) {
            for (let j = 0; j < r.timeSlots[i].length; j++) {
              d = r.dates[i] + "." + r.timeSlots[i][j];
              if (blocked.indexOf(d) !== -1) {
                throw new Error("Invalid dates");
              }
            }
          }
        });

        const record = new reservations();
        record.hallId = obj.HallID;
        record.forumId = req.user._id;
        record.status = "NOT COMPLETED";
        record.eventId = newEvent._id;
        record.dates = obj.dates;
        record.timeSlots = obj.timeSlots;
        await record.save();
      });
      res.json(
        response("Successfully updated reservations", process.env.SUCCESS_CODE)
      );
    } else {
      res.json(response("unauthorized", process.env.FAILURE_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(
      response("Failed to update reservations", process.env.FAILURE_CODE)
    );
  }
};

const updateEquipment = async (req, res) => {
  try {
    const { id, equipmentList } = req.body;
    let eqs = [];
    for (let i = 0; i < equipmentList.length; i++) {
      let { equipment, quantity } = equipmentList[i];
      quantity = Number(quantity);
      let eq = await equipments.findOne({
        name: { $regex: `^${equipment}`, $options: "i" },
      });
      eqs.push({ equipmentType: eq._id, quantity: quantity });
    }
    const event = await events.findById(id);
    event.equipment = eqs;
    await event.save();
    res.json(response("Updated event equipment", process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(
      response("Failed to update event equipment", process.env.FAILURE_CODE)
    );
  }
};

const updateEventDetails = async (req, res) => {
  try {
    let { name, description, eventId } = req.body;

    name = name.trim();
    description = description.trim();
    if (name == "" || description == "") {
      throw new error("Invalid details");
    }
    const event = await events.findById(eventId);
    event.name = name;
    event.description = description;
    if (req.files.eventDocument && req.files?.eventDocument[0]) {
      event.eventProposalDocPath = req.files.eventDocument[0].path;
    }
    await event.save();
    res.json(response("updated event details", process.env.SUCCESS_CODE));
  } catch (error) {
    console.log(error);
    res.json(
      response("Failed to update event details", process.env.FAILURE_CODE)
    );
  }
};

const getEventEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await events
      .findById(id)
      .populate("forumID")
      .populate("equipment.equipmentType");
    if (event == null) throw new Error("event not found");
    if (event.forumID._id == req.user._id) {
      res.json(response(event.equipment, process.env.SUCCESS_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const getEventReservations = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await events.findById(id);
    const r = await reservations.find({ eventId: id }).populate("hallId");
    if (event == null) throw new Error("event not found");
    if (event.forumID._id == req.user._id) {
      const result = {};

      r.forEach((reservation) => {
        const dateList = reservation.dates;
        dateList.forEach((date) => {
          if (result[date]) {
            result[date].halls = [
              ...result[date].halls,
              reservation.timeSlots.map(
                (slot) => slot + "." + reservation.hallId.name
              ),
            ].flat();
          } else {
            result[date] = {
              halls: reservation.timeSlots.map(
                (slot) => slot + "." + reservation.hallId.name
              ),
            };
          }
        });
      });

      res.json(response(result, process.env.SUCCESS_CODE));
    }
  } catch (error) {
    console.log(error);
    res.json(response(error.message, process.env.FAILURE_CODE));
  }
};

const completeEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await events.findById(eventId);

    if (event.eventStatus !== "APPROVED")
      throw new Error(
        "Cannot mark event as complete during its current status"
      );
    //update student reports
    const attendanceDoc = await attendances.findOne({ eventID: eventId });
    const totalDays = event.eventDates.length;
    const qualifiedStudents = [];
    for (let i = 0; i < attendanceDoc.presence.length; i++) {
      const attendancePercentage =
        (attendanceDoc.presence[i].dates.length * 100) / totalDays;
      if (attendancePercentage >= (process.env.MIN_EVENT_PERCENTAGE ? process.env.MIN_EVENT_PERCENTAGE : 50)) {
        qualifiedStudents.push(attendanceDoc.presence[i].studentId);
      }
    }
    //add this event as participated in for each of the qualified students.
    for (let i = 0; i < qualifiedStudents.length; i++) {
      const stu = await students.findById(qualifiedStudents[i]);
      if (stu) {
        stu.eventsParticipated.push(eventId);
        stu.save();
      }
    }
    //update event status
    event.eventCompleted = true;
    await event.save();
    res.json("successfully marked event as complete", process.env.SUCCESS_CODE);
  } catch (err) {
    console.log(err);
    res.json(
      response("failed to mark event as completed.", process.env.FAILURE_CODE)
    );
  }
};

const cancelEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await events.findById(eventId);
    if (event.eventStatus == "CANCELLED")
      throw new Error("already cancelled event");
    event.eventStatus = "CANCELLED";
    await event.save();
    res.json(
      "successfully marked event as cancelled",
      process.env.SUCCESS_CODE
    );
  } catch (err) {
    console.log(err);
    res.json(response(err.message, process.env.FAILURE_CODE));
  }
};

module.exports = {
  getEventReservations,
  getEventEquipment,
  updateEventDetails,
  updateReservations,
  updateEquipment,
  getEventById,
  getBudgetDocument,
  getEventDocument,
  getEvents,
  createEvent,
  updateBudgetDoc,
  reportAndMedia,
  getRequests,
  getCalendarEvents,
  getActiveEvents,
  uploadRegistrantsList,
  eventAttendance,
  postAttendance,
  cancelEvent,
  completeEvent,
};
