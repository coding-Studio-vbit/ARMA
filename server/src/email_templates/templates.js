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

const budgetApprovedTemplate = {
  template: "",
  subject: "Budget Approved",
};

const budgetUpdatedTemplate = {
  template: "",
  subject: "Budget Approved",
};

const budgetRejectedTemplate = {
  template: "",
  subject: "Budget Rejected",
};

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
  budgetDocUpdateTemplate,
  forgotPasswordTemplate,
  budgetApprovedTemplate,
  budgetUpdatedTemplate,
  budgetRejectedTemplate,
  SACApprovedTemplate,
  SACEventUpdatedTemplate,
  SACRejectedTemplate
};
