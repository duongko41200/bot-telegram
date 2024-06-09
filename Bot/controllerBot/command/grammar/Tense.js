const axios = require('axios');
// const { TOPIC_GRAMMAR, TOPIC_THI, TOPIC_CDK, TEST, HTD } = require('../../../CONTANT/grammar/grammar');
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
		return `<blockquote>${value.name}</blockquote>`;
 }).join("\n")}

`.trim();

	return responseData;
};

const grammarTense = async (bot) => {
	bot.command('HTD', async (ctx) => {
		try {
			const message = await getTense('HTD');
			console.log('Message:', message); // Ghi log dữ liệu tin nhắn trước khi gửi đi
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); // Ghi log lỗi nếu có
		}
	});
	bot.command('HTTD', async (ctx) => {
		try {
			const message = await getTense('HTTD');
			console.log('Message:', message); // Ghi log dữ liệu tin nhắn trước khi gửi đi
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); // Ghi log lỗi nếu có
		}
	});
	bot.command('HTHT', async (ctx) => {
		try {
			const message = await getTense('HTHT');
			console.log('Message:', message); // Ghi log dữ liệu tin nhắn trước khi gửi đi
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); // Ghi log lỗi nếu có
		}
	});
};

module.exports = { grammarTense };
