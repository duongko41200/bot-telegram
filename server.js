const express = require('express');
const bodyParser = require('body-parser');
const { setupBot } = require('./Bot/bot');
const schedule = require('node-schedule');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
// Thiết lập Bot
const bot = setupBot();

// Middleware để xử lý JSON và xử lý Webhook từ Telegram
app.use(bodyParser.json());

// Xử lý Webhook từ Telegram
app.post('/webhook', (req, res) => {
	bot.handleUpdate(req.body, res);
});

//// api tạm để báo thưc thời gian hoạc từ trang cron.job.org

app.post('/api/schedule', (req, res) => {
	const { chatId, message } = req.body;
	console.log({ chatId, message });

	bot.telegram.sendMessage(
		5968988559,
		`⏰ đến giờ học tiếng anh rồi:)))`
	);

	return res.status(200).json({
		message: 'duong ok',
	});
});



// Lắng nghe trên cổng đã chọn
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	const webhookUrl = 'https://bot-telegram-swart-seven.vercel.app';

	bot.telegram.setWebhook(`${webhookUrl}/webhook`);
    console.log(`Webhook has been set up at: ${webhookUrl}/webhook`);
	// bot.launch();
	
	  schedule.scheduleJob(
		{ hour: parseInt(19), minute: parseInt(33) },
		() => {
			// Send the notification to the user
			bot.telegram.sendMessage(5968988559, `⏰ Reminder: learn english`);
        }
    )

	//schedule gọi

    
});
