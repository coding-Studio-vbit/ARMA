const welcomeTemplate = {
  template:
    "HALLLLLLLOOOOOOOOO ${userName} WALLLLLLCOM TO THE ARMMMMMAAAAAAAAA EUEUEUEUEUEU MAILING IS WORKINGGG!!!!!!",
  subject: "Welcome from A.R.M.A",
};

const newEventCreatedForum = {
  template:
    "Hey there ${forumName}, New event '${eventName}' has been created. The authorities will be notified shortly :)",
  subject: "New Event Created",
};

const newEventCreatedFO = {
  template:
    "Hey there ${FOName}, New event '${eventName}' has been created by ${forumName}. pls check on ARMA",
  subject: "New Event Created",
};

const newEventCreatedSAC = {
  template:
    "Hey there ${SACName}, New event '${eventName}' has been created by ${forumName}.pls check on ARMA",
  subject: "New Event Created",
};

const eventUpdatedSAC = {
  template:
    "Hey there ${SACName}, details of the event '${eventName}' have been updated by ${forumName}. pls check on ARMA",
  subject: "Event details updated",
};

const budgetDocUpdateTemplate = {
  template:
    "Dear ${FOName}, ${forumName} has updated the budget document for event ${eventName}",
  subject: "Budget Document Update",
};

const forgotPasswordTemplate = {
  template: "Hey there, go to ${passwordLink}",
  subject: "Forgot Password update",
};

const budgetAcceptedForumUpdateTemplate = {
  template: "Hey there, your budget for the event ${eventName} has been accepted",
  subject: "Budget Approved",
};

const budgetAcceptedSACUpdateTemplate = {
  template: "Hey SAC, the budget for the event ${eventName} by ${forumName} has been accepted, please review the event and accept the event proposal in ARMA",
  subject: "Event Budget Approved"
}

const budgetUpdatedTemplate = {
  template: "Hey there, the FO has commented upon your event ${eventName}, please check  the comments on ARMA",
  subject: "FO Commented on Budget",
};

const budgetRejectedForumTemplate = {
  template: "Hey there, The FO has rejected the budget for the event ${eventName}, please approach the FO for further clarification.",
  subject: "Budget Rejected",
};

const budgetRejectedSACTemplate = {
  template: "Hey SAC, the FO has rejected the budget for the event ${eventName}. The forum has been informed about the issue.",
  subject: "Budget Reject for event"
}

const SACApprovedTemplate = {
  template: "Hey there, Congratulations! The SAC has approved your event ${eventName}! Please log on to ARMA to check the status :)",
  subject: "Event Approved by SAC",
};

const SACCommentedTemplate = {
  template: "Hey there, The SAC has commented on your event ${eventName}. Please logon to ARMA to check the comments.",
  subject: "SAC commented on your event",
};

const SACRejectedTemplate = {
  template: "Hey ${forumName}, Unfortunately The SAC has rejected your event ${eventName}. Please check the ARMA app to know more.",
  subject: "Event Rejected by SAC",
};

const MOReportAndMedia = {
  template: "Hey there ${MOName}, ${forumName} has sent the following attachments as media from the event ${eventName}. Take a look!",
  subject: "New Event Media",
}

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
};
