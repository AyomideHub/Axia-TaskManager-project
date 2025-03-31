const mailTransport = require("../config/nodemailer.config");
const sendMail = async (clientEmail) => {
  mailTransport.sendMail(
    {
      from: "Task Manager App",
      to: clientEmail,
      subject: "Welcome",
      html: "<h1>Task Manager</h1>\n<p>Resgistration successful. <b>Start creating tasks</b>",
      generateTextFromHtml: true,
    },
    function (err) {
      if (err) console.error("Unable to send email: " + err);
    }
  );
};

module.exports = sendMail;
