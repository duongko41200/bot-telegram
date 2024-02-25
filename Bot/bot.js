const { Telegraf } = require('telegraf');
const axios = require('axios');

const {
	signUpHandle,
} = require('./controllerBot/access.controllerBot');
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

	// bot.on('text', (ctx, next) => {
	// 	console.log('ctx tẽt:', ctx.update.message.text);
	// 	ctx.reply('tôi đã nhận được feedback của bạn');
	// 	next(ctx);
	// });

	bot.command('test', (ctx) => {
		ctx.telegram.sendMessage(ctx.chat.id, 'duong dep trai');
		console.log('chat id:', ctx.chat.id, ctx.from);
	});

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

	// bot.launch();



