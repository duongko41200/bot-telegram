const express = require('express');
const bodyParser = require('body-parser');
const { setupBot } = require('./Bot/bot');
const schedule = require('node-schedule');

const app = express();
const port = process.env.PORT || 3000;

// Thiết lập Bot
const bot = setupBot();

// Middleware để xử lý JSON và xử lý Webhook từ Telegram
app.use(bodyParser.json());

// Xử lý Webhook từ Telegram
app.post('/webhook', (req, res) => {
    bot.handleUpdate(req.body, res);
});

// Lắng nghe trên cổng đã chọn
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    const webhookUrl = 'https://bot-telegram-swart-seven.vercel.app';

    console.log("skdfjksd",bot.cont)
    bot.telegram.setWebhook(`${webhookUrl}/webhook`);
    console.log(`Webhook has been set up at: ${webhookUrl}/webhook`);
    schedule.scheduleJob(
		{ hour: parseInt(20), minute: parseInt(20) },
		() => {
			// Send the notification to the user
			bot.telegram.sendMessage(5968988559, `⏰ Reminder: learn english`);
        }
    )
    schedule.scheduleJob(
		{ hour: parseInt(9), minute: parseInt(0) },
		() => {
			// Send the notification to the user
			bot.telegram.sendMessage(5968988559, `⏰ Reminder: drinking water`);
        }
    )
});