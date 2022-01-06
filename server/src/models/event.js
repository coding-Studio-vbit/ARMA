const mongoose = require("mongoose");

const event = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [
      process.env.MIN_NAME_LENGTH,
      `Name must be minimum ${process.env.MIN_NAME_LENGTH} characters`,
    ],
    maxLength: [
      process.env.MAX_NAME_LENGTH,
      `Name must be max ${process.env.MAX_NAME_LENGTH} characters`,
    ],
  },
  description: {
    type: String,
    minLength: [
      process.env.MIN_EVENT_DESCRIPTION_LENGTH,
      `description has to consist of minimum ${process.env.MIN_EVENT_DESCRIPTION_LENGTH} characters.`,
    ],
    maxLength: [
      process.env.MAX_EVENT_DESCRIPTION_LENGTH,
      `description has to consist of maximum ${process.env.MAX_EVENT_DESCRIPTION_LENGTH} characters.`,
    ],
  },
  forumID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "forums",
  },
  attendanceDocID: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "attendance",
  },
  eventStatus: {
    type: String,
    default: "APPROVAL PENDING",
    enum: [
      "APPROVAL PENDING",
      "REQUESTED CHANGES",
      "APPROVED",
      "REJECTED",
      "COMPLETED",
    ],
  },
  hasBudget: {
    type: Boolean,
    required: true,
  },
  budgetStatus: {
    type: String,
    default: "APPROVAL PENDING",
    enum: ["APPROVAL PENDING", "REQUESTED CHANGES", "APPROVED", "REJECTED"],
  },
  eventDates: [Date],
  eventProposalDocPath: {
    type: String,
    required: true,
  },
  budgetDocPath: {
    type: String,
    required: this.hasBudget,
  },
  reportDocPath: {
    type: String,
  },
  mediaFilePaths: [{ type: String }],
  FOComments: String,
  SACComments: String,
});

const events = mongoose.model("events", event);
module.exports = events;
