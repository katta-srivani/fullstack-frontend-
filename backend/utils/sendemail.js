const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME || "Password Reset App"}" <${process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;