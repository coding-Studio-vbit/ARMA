const nodemailer = require("nodemailer");

const fillTemplateWithData = (template, data) => {
  let temp = template;
  for (property in data) {
    temp = temp.replace(`\${${property}}`, data[property]);
  }

  return temp;
};

let mailTransporter = nodemailer.createTransport({
  service: "yandex",
  auth: {
    user: process.env.NODEMAILER_EMAIL_ID,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

const sendMail = (toAddress, emailTemplate, emailData) => {
  return new Promise((resolve, reject) => {
    const mailDetails = {
      from: process.env.NODEMAILER_EMAIL_ID,
      to: toAddress,
      envelope:{
        from: `A.R.M.A ${process.env.NODEMAILER_EMAIL_ID}`,
        to: toAddress
      },
      subject: emailTemplate.subject,
      html: fillTemplateWithData(emailTemplate.template, emailData),
    };

    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err);
        reject(new Error("Mailing failed!"));
      } else {
        resolve();
      }
    });
  });
};

module.exports = { sendMail };
