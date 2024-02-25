import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function VerifyMailServer() {
  await transporter.verify((err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success to connect to mail server");
    }
  });
}
export default transporter;
export { VerifyMailServer };
