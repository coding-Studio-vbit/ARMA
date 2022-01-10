const welcomeTemplate = {
  template:
    "HALLLLLLLOOOOOOOOO ${userName} WALLLLLLCOM TO THE ARMMMMMAAAAAAAAA EUEUEUEUEUEU MAILING IS WORKINGGG!!!!!!",
  subject: "Welcome from A.R.M.A",
};

const budgetDocUpdateTemplate = {
  template:"Dear ${FOName}, ${forumName} has updated the budget document for event ${eventName}",
  subject: "Budget Document Update",
}

module.exports = {
  welcomeTemplate,
  budgetDocUpdateTemplate
};
