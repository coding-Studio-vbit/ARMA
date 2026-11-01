const nodemailer = require("nodemailer");

const fillTemplateWithData = (template, data) => {
  let temp = template;
  for (const property in data) {
    temp = temp.split(`\${${property}}`).join(data[property] || "");
  }
  return temp;
};

const getTransporter = () => {
  const user = process.env.NODEMAILER_EMAIL_ID;
  const pass = process.env.NODEMAILER_EMAIL_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "yandex",
    auth: { user, pass },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });
};

const sendMail = (toAddress, emailTemplate, emailData, attachments) => {
  return new Promise((resolve) => {
    const transporter = getTransporter();

    if (!transporter) {
      console.warn(`[MAILER] SMTP credentials missing. Skipped sending email to ${toAddress}`);
      return resolve({ success: false, reason: "SMTP not configured" });
    }

    const mailDetails = {
      from: process.env.NODEMAILER_EMAIL_ID,
      to: toAddress,
      envelope: {
        from: `A.R.M.A <${process.env.NODEMAILER_EMAIL_ID}>`,
        to: toAddress,
      },
      subject: emailTemplate?.subject || "A.R.M.A Notification",
      html: fillTemplateWithData(emailTemplate?.template || "", emailData),
    };

    if (attachments) {
      mailDetails.attachments = attachments;
    }

    transporter.sendMail(mailDetails, (err, info) => {
      if (err) {
        console.error(`[MAILER] Delivery failed to ${toAddress}:`, err.message);
        return resolve({ success: false, error: err.message });
      }
      console.log(`[MAILER] Email successfully sent to ${toAddress}`);
      resolve({ success: true, info });
    });
  });
};

module.exports = { sendMail };
