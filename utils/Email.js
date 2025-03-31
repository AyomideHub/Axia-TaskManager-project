const mailTransport = require("../config/nodemailer.config");
const welcomeMail = async (clientEmail) => {
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

const remainderMail = async (clientEmail, taskname) => {
	mailTransport.sendMail(
	  {
		from: "Task Manager App",
		to: clientEmail,
		subject: "Deadline Apporaching",
		html: `<h1>Hurry up and complete your task </h1>\n <b>you have less minute to finish your ${taskname} task</b>`,
		generateTextFromHtml: true,
	  },
	  function (err) {
		if (err) console.error("Unable to send email: " + err);
	  }
	);
  };

module.exports = {welcomeMail, remainderMail};
