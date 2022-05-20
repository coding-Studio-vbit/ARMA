const welcomeTemplate = {
  template:
    "HALLLLLLLOOOOOOOOO ${userName} WALLLLLLCOM TO THE ARMMMMMAAAAAAAAA EUEUEUEUEUEU MAILING IS WORKINGGG!!!!!!",
  subject: "Welcome from A.R.M.A",
};

const newEventCreatedForum = {
  template:
    "Hey there ${forumName}, New event '${eventName}' has been created. The SAC and other concerned authorities will be notified shortly.",
  subject: "New Event Created",
};

const newEventCreatedFO = {
  template:
    "Hey there ${FOName}, New event '${eventName}' has been created by ${forumName}. Please check the event details on A.R.M.A.",
  subject: "New Event Created",
};

const newEventCreatedSAC = {
  template:
    "Hey there ${SACName}, New event '${eventName}' has been created by ${forumName}. Please check the event details on A.R.M.A.",
  subject: "New Event Created",
};

const eventUpdatedSAC = {
  template:
    "Hey there ${SACName}, details of the event '${eventName}' have been updated by ${forumName}. Please check the updates on A.R.M.A.",
  subject: "Event details updated",
};

const budgetDocUpdateTemplate = {
  template:
    "Dear ${FOName}, ${forumName} has updated the budget document for event ${eventName}",
  subject: "Budget Document Update",
};

const forgotPasswordTemplate = {
  template:
    "Hey there, We have received a password reset request from you. Go to the following link to reset your password: ${passwordLink}",
  subject: "Reset Password",
};

const budgetAcceptedForumUpdateTemplate = {
  template:
    "Hey there, your budget for the event ${eventName} has been accepted.",
  subject: "Budget Approved",
};

const budgetAcceptedSACUpdateTemplate = {
  template:
    "Hey SAC, the budget for the event ${eventName} by ${forumName} has been accepted, please review the event and accept the event proposal in A.R.M.A",
  subject: "Event Budget Approved",
};

const budgetUpdatedTemplate = {
  template:
    "Hey there, the FO has commented upon your event ${eventName}, please check  the comments on A.R.M.A",
  subject: "FO Commented on Budget",
};

const budgetRejectedForumTemplate = {
  template:
    "Hey there, The FO has rejected the budget for the event ${eventName}, please approach the FO for further clarification.",
  subject: "Budget Rejected",
};

const budgetRejectedSACTemplate = {
  template:
    "Hey SAC, the FO has rejected the budget for the event ${eventName}. The forum has been informed about the issue.",
  subject: "Budget Rejected",
};

const SACApprovedTemplate = {
  template:
    "Hey there, Congratulations! The SAC has approved your event ${eventName}!",
  subject: "Event Approved by SAC",
};

const SACCommentedTemplate = {
  template:
    "Hey there, The SAC has commented on your event ${eventName}. Please logon to A.R.M.A to check the comments.",
  subject: "SAC commented on your event",
};

const SACRejectedTemplate = {
  template:
    "Hey ${forumName}, Unfortunately The SAC has rejected your event ${eventName}. Please check the A.R.M.A app to know more.",
  subject: "Event Rejected by SAC",
};

const MOReportAndMedia = {
  template:
    "Hey there ${MOName}, ${forumName} has sent the following attachments as media from the event ${eventName}. Upload them to the official VBIT website, Take a look!",
  subject: "New Event Media Received",
};
const RegistrarNewEvent = {
  template:
    "Hey there ${RegistrarName}, ${forumName} has created a new event ${eventName} with the following equipment list: ${equipmentList}",
  subject: "New Event Equipment Requirement",
};
const RegistrarEquipmentUpdate = {
  template:
    "Hey there ${RegistrarName}, ${forumName} has updated the equipment requirement for the event ${eventName}, the new equipment list is: ${equipmentList}",
  subject: "Event Equipment Update",
};
const CFINewEvent = {
  template:
    "Hey there ${CFIName}, ${forumName} has created a new event ${eventName} with the following equipment list: ${equipmentList}",
  subject: "NEw Event Equipment Requirement",
};
const CFIEquipmentUpdate = {
  template:
    "Hey there ${CFIName}, ${forumName} has updated the equipment requirement for the event ${eventName}, the new equipment list is: ${equipmentList}",
  subject: "Event Equipment Update",
};

module.exports = {
  welcomeTemplate,
  forgotPasswordTemplate,
  budgetDocUpdateTemplate,
  budgetAcceptedForumUpdateTemplate,
  budgetAcceptedSACUpdateTemplate,
  budgetUpdatedTemplate,
  budgetRejectedForumTemplate,
  budgetRejectedSACTemplate,
  SACApprovedTemplate,
  SACCommentedTemplate,
  SACRejectedTemplate,
  newEventCreatedFO,
  newEventCreatedSAC,
  newEventCreatedForum,
  MOReportAndMedia,
  eventUpdatedSAC,
  RegistrarNewEvent,
  RegistrarEquipmentUpdate,
  CFINewEvent,
  CFIEquipmentUpdate,
};
