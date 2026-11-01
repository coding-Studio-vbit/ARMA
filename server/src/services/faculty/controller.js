const escapeRegex = require("../util/escapeRegex");
const bcrypt = require("bcrypt");
const facultyModel = require("../../models/faculty");
const faculty = require("../../models/faculty");
const roles = require("../../models/role");
const events = require("../../models/event");
const response = require("../util/response");
const await await await mailer.sendMail(event.forumID.email, SACRejectedTemplate, {
      eventName: event.name,
    });
    return res.json(response("successfully rejected the event", process.env.SUCCESS_CODE));
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
