const {
	TOPIC_GRAMMAR,
	TOPIC_THI,
	TOPIC_CDK,
	TEST,
} = require('../../../CONTANT/grammar/grammar');
const { grammarTense } = require('./Tense');
const { grammarCondition } = require('./condition');

const grammarEnglish = (bot) => {
	bot.command('grammar', (ctx) => {
		ctx.reply(
			`Danh sách ngữ pháp thông dụng:<Bạn tham khảo nhé:))> \n ${TOPIC_GRAMMAR}`
		);
	});

	bot.command('Tenses', (ctx) => {
		ctx.reply(`${TOPIC_THI}`, { parse_mode: 'HTML' });
	});
	bot.command('CDK', (ctx) => {
		ctx.reply(TOPIC_CDK, { parse_mode: 'HTML' });
	});
	bot.command('test', (ctx) => {
		ctx.reply(TEST, { parse_mode: 'HTML' });
	});

	grammarTense(bot);
	grammarCondition(bot)
};

module.exports = { grammarEnglish };
