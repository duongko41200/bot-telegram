
const axios = require('axios');
const { Tutorial } = require('../CONTANT/tutorial');
const registrationInfo = {
	name: '',
	email: '',
	password: '',
};
const web_link = 'https://bot-app-english.vercel.app/';
const signUpHandle = (bot) => {
	bot.command('signup', (ctx) => {
		// ctx.telegram.sendMessage(ctx.chat.id, Tutorial.signUp);
		const userId = ctx.from.id;
		ctx.reply(`${Tutorial.signUp}`, {
			reply_markup: {
				keyboard: [[{ text: 'Đăng ký', web_app: { url: `${web_link}/signup?id=${userId}` } }]],
			},
		})
	});


	// DIỀN THÔNG TIN ĐĂNG KÝ
	bot.command('name', (ctx) => { 
		let input = ctx.message.text;
		let inputArr = input.split(' ');
		let message = '';
		if (inputArr.length === 1) {
			message =
				'Bạn không đặt tên nên mik sẽ lấy tên trên telegram của bạn:';
			ctx.reply(`${message} ${ctx.from.first_name}`);
			registrationInfo.name = ctx.from.first_name;

			return;
		} else {
			inputArr.shift();
			console.log({ inputArr });
			message = inputArr.join(' ');
			registrationInfo.name = message.toString();
		}
		ctx.reply(`Mình đã nhận được thông tin email của bạn : ${message}`);
	});
	bot.command('email', (ctx) => {
		let input = ctx.message.text;
		let inputArr = input.split(' ');
		let message = '';
		if (inputArr.length === 1) {
			message = 'Bạn cần nhập email của mình';
			ctx.reply(`${message}`);
			return;
		} else {
			inputArr.shift();
			console.log({ inputArr });
			message = inputArr.join(' ');
			registrationInfo.email = message.toString();
		}
		ctx.reply(`Mình đã nhận được thông tin email của bạn : ${message}`);
	});
	bot.command('password', (ctx) => {
		let input = ctx.message.text;
		let inputArr = input.split(' ');
		let message = '';
		if (inputArr.length === 1) {
			message = 'Bạn cần nhập email của mình';
			ctx.reply(`${message}`);
			return;
		} else {
			inputArr.shift();
			console.log({ inputArr });
			message = inputArr.join(' ');
			registrationInfo.password = message.toString();
		}
		ctx.reply(
			`Mình đã nhận được thông tin password của bạn : ${message}`
		);
	});

	bot.command('submit', async (ctx) => {
		if (
			registrationInfo.email === '' ||
			registrationInfo.password === ''
		) {
			ctx.reply(
				'pikachu thấy bạn còn thiếu thông tin:)). Hãy kiểm tra lại email và password'
			);
			return;
		}
		ctx.reply(`Thông tin đăng ký của bạn là:
		name:  ${
			registrationInfo.name
				? registrationInfo.name
				: (registrationInfo.name = ctx.from.first_name)
		}
		email: ${registrationInfo.email}
		password: ${registrationInfo.password}
	
	`);
	ctx.reply('Quá trình đăng ký đăng diễn ra ...')

		const headers = {
			'x-api-key':
				'4379e3b406e606110a01e8fbe364120fdc58be39a9f30431476dd53ad14b20fe66f52423a3e4546dfa272f4c389822299709414bb44b6b3ffce7f04292be2556',
		};
		const signUp = await axios
			.post(
				`https://bot-app-english.vercel.app/signup`,
				{
					name: registrationInfo.name,
					email: registrationInfo.email,
					password: registrationInfo.password,
				},
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				console.log(`ApiService: ${error}`);
				if (error.response) {
					// Request made and server responded
					return error.response.data;
				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
					return error;
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error);
					return error;
				}
			});
		
	
		if (signUp.status == '200') {
			ctx.reply(`Bạn đã đăng ký tài khoản thành công!
					Đây là thông tin tài khoản của bạn:
						name:  ${
							registrationInfo.name
								? registrationInfo.name
								: (registrationInfo.name = ctx.from.first_name)
						}
						email: ${registrationInfo.email}
						password: ${registrationInfo.password}

					TÔI RẤT VUI KHI ĐƯỢC ĐỒNG HÀNH VỚI BẠN:)))
					

			
					`)
		} else {
			ctx.reply(`${signUp.message}`)
		}

	});

	bot.command('check_Signup', (ctx) => {
		ctx.reply(`Kiểm tra lại thông tin đăng ký của bạn là:
					name:  ${
						registrationInfo.name
							? registrationInfo.name
							: (registrationInfo.name = ctx.from.first_name)
					}
					email: ${registrationInfo.email}
					password: ${registrationInfo.password}
				
				`);
		
	});
};

module.exports = { signUpHandle };
