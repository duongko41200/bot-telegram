const axios = require('axios');
const data = require('../../../data/tense.json');

const getTense = async (command) => {
	let dataTense =  data.tense.filter(
		(value) => value.command === command
	);

	dataTense = dataTense[0];

	const responseData = `

 📜 ${dataTense.title} \n
<b>🔅💥<u>Diễn tả:</u></b>
|<b>-------------------------------------------</b>
 ${dataTense?.des?.map((value, idx) => {
	return `* ${value.name}${idx!=dataTense?.des?.length-1 ?"\n":""}`}).join(" ").trim()}               
|<b>-------------------------------------------</b>

 <b>🔅💥<u>Công thức:</u></b>
<pre><code class="language-khang-dinh">${
		dataTense.khangDinh
	}</code></pre>
<pre><code class="language-phu-dinh">${dataTense.phuDinh}</code></pre>
<pre><code class="language-cau-hoi">${dataTense.cauHoi}</code></pre>

 <b>🔅💥<u>Tình huống: </u></b>
 ${dataTense?.tinhHuong?.map((value) => {
		return `<blockquote expandable>${value.name}</blockquote>`;
 }).join("\n")}

`.trim();

	return responseData;
};

const grammarTense = async (bot) => {
	bot.command('HTD', async (ctx) => {
		try {
			const message = await getTense('HTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('HTTD', async (ctx) => {
		try {
			const message = await getTense('HTTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('HTHT', async (ctx) => {
		try {
			const message = await getTense('HTHT');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('HTHTTD', async (ctx) => {
		try {
			const message = await getTense('HTHTTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('QKD', async (ctx) => {
		try {
			const message = await getTense('QKD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('QKTD', async (ctx) => {
		try {
			const message = await getTense('QKTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('QKHT', async (ctx) => {
		try {
			const message = await getTense('QKHT');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});

	bot.command('QKHTTD', async (ctx) => {
		try {
			const message = await getTense('QKHTTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});

	bot.command('TLD', async (ctx) => {
		try {
			const message = await getTense('TLD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('TLTD', async (ctx) => {
		try {
			const message = await getTense('TLTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('TLHT', async (ctx) => {
		try {
			const message = await getTense('TLHT');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});
	bot.command('TLHTTD', async (ctx) => {
		try {
			const message = await getTense('TLHTTD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});


};

module.exports = { grammarTense };
