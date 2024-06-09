const axios = require('axios');
const { TOPIC_GRAMMAR, TOPIC_THI, TOPIC_CDK, TEST, HTD } = require('../../../CONTANT/grammar/grammar');
const { grammarTense } = require('./Tense');

const grammarEnglish = (bot) => {
	bot.command('grammar', (ctx) => {
		ctx.reply(
			`Danh sách ngữ pháp thông dụng:<Bạn tham khảo nhé:))> \n ${TOPIC_GRAMMAR}`
		);
	});

	bot.command('Tenses', (ctx) => {
		ctx.reply(
			`Danh sách THÌ thông dụng\n ${TOPIC_THI}`
		);
	});
	bot.command('CDK', (ctx) => {
		bot.telegram.sendMessage(ctx.message.from.id, TOPIC_CDK, { parse_mode: 'HTML' })

		// ctx.replyWithMarkdown(TOPIC_CDK)
	})
	bot.command('test', (ctx) => {
		bot.telegram.sendMessage(ctx.message.from.id, TEST, { parse_mode: 'HTML' })

		// ctx.replyWithMarkdown(TOPIC_CDK)
	})
	// bot.command('HTD', (ctx) => {
	// 	bot.telegram.sendMessage(ctx.message.from.id, HTD, { parse_mode: 'HTML' })

	// 	// ctx.replyWithMarkdown(TOPIC_CDK)
	// })

	grammarTense(bot)

};

module.exports = { grammarEnglish };
