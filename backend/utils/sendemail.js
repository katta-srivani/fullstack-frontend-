const nodemailer = require("nodemailer");

const getSmtpPort = () => Number(process.env.SMTP_PORT || 587);

const getSmtpPortsToTry = (host, preferredPort) => {
  const ports = [preferredPort];

  if (host === "smtp.gmail.com") {
    ports.push(465, 587);
  }

  return [...new Set(ports)];
};

const createTransporter = (host, port, user, pass) =>
  nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    },
    connectionTimeout: 20000,
    greetingTimeout: 10000,
    socketTimeout: 30000
  });

const sendEmail = async (to, subject, html) => {
  const host = process.env.SMTP_HOST;
  const preferredPort = getSmtpPort();
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const senderEmail = process.env.MAIL_FROM_EMAIL || user;
  const senderName = process.env.MAIL_FROM_NAME || "Password Reset App";

  if (!host || !user || !pass || !senderEmail) {
    throw new Error("SMTP_HOST, SMTP_USER, SMTP_PASS, and MAIL_FROM_EMAIL must be set in backend .env");
  }

  let lastError;

  for (const port of getSmtpPortsToTry(host, preferredPort)) {
    try {
      const transporter = createTransporter(host, port, user, pass);
      const info = await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to,
        subject,
        html
      });

      console.log(`Email sent successfully via ${host}:${port}:`, info.messageId);
      return info;
    } catch (error) {
      lastError = error;
      console.error(`Email send failed via ${host}:${port}:`, error.message);
    }
  }

  throw lastError;
};

module.exports = sendEmail;
