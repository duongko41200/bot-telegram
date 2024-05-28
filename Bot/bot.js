const { Telegraf } = require('telegraf');
const axios = require('axios');

const {
	signUpHandle,
} = require('./controllerBot/access.controllerBot');
const schedule = require('node-schedule');
// const { scheduleNotification } = require('./controllerBot/feature/scheduleRemind');
// const { LocalStorage } = require('node-localstorage');

// Tạo một kho lưu trữ local với đường dẫn tạm thời
// const localStorage = new LocalStorage('./scratch');
axios.defaults.headers = {
	'Cache-Control': 'no-cache',
	Pragma: 'no-cache',
	Expires: '0',
};

// bot.telegram.setWebhook(`https://bot-app-english.vercel.app/webhook/${TOKEN}`)
// bot.telegram.setWebhook(
// 	`https://api.telegram.org/bot6893164702:AAEPdDlqfEy20Np_goXO7R-9cqAgfelPys0/setWebHook?url=https://bot-app-english.vercel.app`
// );

const web_link = 'https://bot-app-english.vercel.app/';

const tutorialMessage = `
	Đây là danh sách các câu lệnh
	/start - Hiên thị các danh sách sử dụng bot
	/signup - đăng ký sử dụng app
`;

// bot.use((ctx, next) => {
// 	console.log(ctx);
// 	next();
// });

const setupBot = () => {
	const TOKEN = '6893164702:AAEPdDlqfEy20Np_goXO7R-9cqAgfelPys0';
	const bot = new Telegraf(TOKEN);
	bot.start((ctx) => {
		// Gửi tin nhắn và thiết lập nút web_app
		ctx.reply(`${tutorialMessage}`, {
			reply_markup: {
				keyboard: [[{ text: 'web app', web_app: { url: web_link } }]],
			},
		});

		// Lưu idTelegram vào localStorage
		// localStorage.setItem('idTelegram', ctx.from.id.toString());
	});

	bot.use((ctx, next) => {
		console.log('Received a message:', ctx.message);
		return next();
	});

	//access bot
	signUpHandle(bot);

	bot.hears('hi', (ctx) => {
		ctx.reply(`hi ${ctx.from.first_name}! how are you today?`);
	});

	bot.command('test', (ctx) => {
		ctx.telegram.sendMessage(ctx.chat.id, 'duong dep trai');
		console.log('chat id:', ctx.chat.id, ctx.from);
	});

	const userNotifications = {};

	bot.command('set', (ctx) => {
		const message = ctx.message.text;

		// Extract the time and message using a regular expression
		const match = message.match(/^\/set\s+([\d:]+)\s+(.+)/);

		// Check if the time and message are provided
		try {
			if (match) {
				const time = match[1];
				const notificationMessage = match[2];

				// Save the notification for the user
				const userId = ctx.message.from.id;

				// Check if the user already has notifications
				if (!userNotifications[userId]) {
					userNotifications[userId] = [];
				}

				// Add the new notification to the array
				userNotifications[userId].push({
					time,
					message: notificationMessage,
				});
				console.log('userNotifications: ', userNotifications);

				ctx.reply(
					`✅ Notification set for ${time} - ${notificationMessage}`
				);

				// Schedule the notification
				scheduleNotification(userId, time, notificationMessage);
			} else {
				ctx.reply(
					'⚠️ Please provide both time and notification message in the correct format. ' +
						'\n\nExample format: `/set 12:30 Cook some dinner`'
				);
			}
		} catch (error) {
			console.log({ error });
		}
	});

	// Command to view all notifications
bot.command("viewReminder", (ctx) => {
	const userId = ctx.message.from.id;
	const userNotificationsArray = userNotifications[userId];
  
	if (userNotificationsArray && userNotificationsArray.length > 0) {
	  // Use map to create a string for each notification
	  const notificationsString = userNotificationsArray
		  .map((notification, index) => {
			return `${index + 1}. ${notification.time} - ${notification.message}`;
		  })
		  .join("\n");
  
	  ctx.reply(
		  `Your notifications:\n${notificationsString}\n\nTo delete a notification, use /deleteReminder <index>`
	  );
	} else {
	  ctx.reply("You have no notifications set.");
	}
});
	
	
	// Command to delete a notification by index
bot.command("deleteReminder", (ctx) => {
	const userId = ctx.message.from.id;
	const indexToDelete = parseInt(ctx.message.text.split(" ")[1]); // Extract index from command
  
	if (!isNaN(indexToDelete)) {
	  // Attempt to delete the notification
	  const deleted = deleteReminder(userId, indexToDelete - 1);
	  // Adjust index since users usually start counting from 1
  
	  if (deleted) {
		ctx.reply("✅ Notification deleted successfully.");
	  } else {
		ctx.reply("⚠️ Unable to delete notification. Please check the index.");
	  }
	} else {
	  ctx.reply("⚠️ Please provide a valid index to delete a notification.");
	}
  });
  
  // Command to show help and disable other commands
  bot.command("help", (ctx) => {
	ctx.reply(
		"🤖 Notification Bot\n\n📅 To set up a notification: /setnotification HH:MM Your notification message" +
		"\n\n📆 To view all notifications: /viewnotifications\n\n🗑 To delete a notification: " +
		"/deleteReminder <index>\n\n❓ For help: /help"
	);
  });
	
	// Command to show help and disable other commands
bot.command("help", (ctx) => {
	ctx.reply(
		"🤖 Notification Bot\n\n📅 To set up a notification: /setnotification HH:MM Your notification message" +
		"\n\n📆 To view all notifications: /viewnotifications\n\n🗑 To delete a notification: " +
		"/deleteReminder <index>\n\n❓ For help: /help"
	);
  });
	
  function deleteReminder(userId, index) {
	const userNotificationsArray = userNotifications[userId];
  
	if (userNotificationsArray && userNotificationsArray.length > index) {
	  // Remove the notification at the specified index
	  userNotificationsArray.splice(index, 1);
	  return true; // Return true if deletion is successful
	}
	return false; // Return false if deletion fails (e.g., index out of bounds)
  }

	function scheduleNotification(userId, time, message) {
		try {
			const [hours, minutes] = time.split(':');

			// Schedule the job

			console.log('data vào đây');

			userNotifications[userId].job = schedule.scheduleJob(
				{ hour: parseInt(hours), minute: parseInt(minutes) },
				() => {
					// Send the notification to the user
					try{
						const test = bot.telegram.sendMessage(userId, `⏰ Reminder: ${message}`);

						if(!test){
							bot.telegram.sendMessage(userId, `⏰ Reminder: ${message}
						}
						console.log("value send mess",test)
					}catch(error){
						
						bot.telegram.sendMessage(userId, `⏰ Reminder: ${message}`);
						console.log("lỗi sendMess", error)

	
					}
					
				}
			);
		} catch (error) {
			console.log({ error });
		}
	}

	bot.command('echo', (ctx) => {
		let input = ctx.message.text;
		let inputArr = input.split(' ');
		let message = '';
		if (inputArr.length === 1) {
			message = 'không có nội dung';
		} else {
			inputArr.shift();
			console.log({ inputArr });
			message = inputArr.join(' ');
		}
		ctx.reply(message);
	});

	bot.launch();

	return bot;
};
setupBot()
module.exports = { setupBot };
