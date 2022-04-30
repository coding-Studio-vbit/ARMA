const welcomeTemplate = {
  template:
    "HALLLLLLLOOOOOOOOO ${userName} WALLLLLLCOM TO THE ARMMMMMAAAAAAAAA EUEUEUEUEUEU MAILING IS WORKINGGG!!!!!!",
  subject: "Welcome from A.R.M.A",
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
  template: "",
  subject: "Event Approved by SAC",
};

const SACEventUpdatedTemplate = {
  template: "",
  subject: "Event Approved by SAC",
};

const SACRejectedTemplate = {
  template: "",
  subject: "Event Rejected by SAC",
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
  SACEventUpdatedTemplate,
  SACRejectedTemplate,
};
