const nodemailer = require("nodemailer");

const fillTemplateWithData = (template, data) => {
  let temp = template;
  for (const property in data) {
    temp = temp.split(`\${${property}}`).join(data[property] || "");
  }
  return temp;
};

const getTransporter = () => {
  const host = process.env.SMTP_HOST || (process.env.NODEMAILER_SERVICE ? null : "smtp-relay.brevo.com");
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.NODEMAILER_EMAIL_ID;
  const pass = process.env.SMTP_PASS || process.env.NODEMAILER_EMAIL_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  if (process.env.NODEMAILER_SERVICE) {
    return nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: { user, pass },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
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

    const fromAddress = process.env.MAIL_FROM || process.env.NODEMAILER_EMAIL_ID || process.env.SMTP_USER;

    const mailDetails = {
      from: `A.R.M.A <${fromAddress}>`,
      to: toAddress,
      envelope: {
        from: fromAddress,
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
