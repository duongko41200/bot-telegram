
const schedule = require("node-schedule")

function scheduleNotification(userId, time, message) {
	const [hours, minutes] = time.split(":");
  
	// Schedule the job


	userNotifications[userId].job = schedule.scheduleJob(
		{ hour: parseInt(hours), minute: parseInt(minutes) },
		() => {
		  // Send the notification to the user
		  bot.telegram.sendMessage(userId, `⏰ Reminder: ${message}`);
		}
	);
}
module.exports = {
    scheduleNotification
};
