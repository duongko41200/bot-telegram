const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const TOKEN = '6893164702:AAEPdDlqfEy20Np_goXO7R-9cqAgfelPys0';
const bot = new Telegraf(TOKEN);

const app = express();
const port = process.env.PORT || 3000;

// const web_link = 'https://bot-telegram-swart-seven.vercel.app/';

// const tutorialMessage = `
// 	Đây là danh sách các câu lệnh
// 	/start - Hiển thị các danh sách sử dụng bot
// 	/signup - Đăng ký sử dụng app
// `;

// bot.start((ctx) => {
// 	// Gửi tin nhắn và thiết lập nút web_app
// 	ctx.reply(`${tutorialMessage}`, {
// 		reply_markup: {
// 			keyboard: [[{ text: 'web app', web_app: { url: web_link } }]],
// 		},
// 	});
// });

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
	bot.handleUpdate(req.body, res);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	const webhookUrl = 'https://bot-telegram-swart-seven.vercel.app';
	bot.telegram.setWebhook(`${webhookUrl}/webhook`);
	console.log(`Webhook has been set up at: ${webhookUrl}/webhook`);
});
