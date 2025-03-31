var cron = require("node-cron");
const { remainderMail } = require("./Email");

const deadlineRemainder = (Task, User) => {
  cron.schedule("59 * * * *", async () => {
    console.log("running a task At minute 59");

    const tasks = await Task.find({Deadline: {$lte : Date.now() + 1 * 60 * 60 * 1000}, Status: 'incomplete', reminderSent: { $ne: true }});
    console.log(tasks);
      tasks.forEach(async (task) => {
        const user = await User.findById(task.CreatedBy);
        if (user) {
          await remainderMail(user.email, task.Name);
          console.log(`Reminder sent for task: ${task.Name}`);
          task.reminderSent = true;
          await task.save();
        }
      })

  });
};

module.exports = { deadlineRemainder };
