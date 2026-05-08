const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP_USER or SMTP_PASS missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.verify();

  return transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME || "Password Reset App"}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;