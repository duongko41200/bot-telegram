const conditionGrammar = require('../../../data/condition.json');

const getCondition = async (command) => {
	let condition =  conditionGrammar.condition.filter(
		(value) => value.command === command
	);

	condition = condition[0];

	const responseData = `

 📜 ${condition.title} \n
<b>🔅💥<u>Diễn tả:</u></b>
|<b>-------------------------------------------</b>
 ${condition?.des?.map((value, idx) => {
	return `* ${value.name}${idx!=condition?.des?.length-1 ?"\n":""}`}).join(" ").trim()}               
|<b>-------------------------------------------</b>

 <b>🔅💥<u>Công thức:</u></b>
|<b>-------------------------------------------</b>
<i><b>   ${condition.congThuc}</b></i>
|<b>-------------------------------------------</b>

 <b>🔅💥<u>Giải thích công thức:</u></b>
<pre>
${condition.giaiThich}
</pre>

 <b>🔅💥<u>Tình huống: </u></b>
 ${condition?.tinhHuong?.map((value) => {
		return `<blockquote expandable>${value.name}</blockquote>`;
 }).join("\n")}

`.trim();

	return responseData;
};

const grammarCondition = async (bot) => {
	bot.command('condition1', async (ctx) => {
		try {
			const message = await getCondition('condition1');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('condition2', async (ctx) => {
		try {
			const message = await getCondition('condition2');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('condition3', async (ctx) => {
		try {
			const message = await getCondition('condition3');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});



};

module.exports = { grammarCondition };
