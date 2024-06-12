const CBD = require('../../../data/cauBiDong.json');

const getCBD = async (command) => {
	let condition =  CBD.CBD.filter(
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

<blockquote expandable> <b><u>Hiện Tại Đơn</u></b>\n${condition.congThuc[0].name}</blockquote>
<blockquote expandable> <b><u>Quá Khứ Đơn</u></b>\n${condition.congThuc[1].name}</blockquote>
<blockquote expandable> <b><u>Tương Lai Đơn</u></b>\n${condition.congThuc[2].name}</blockquote>

 <b>🔅💥<u>Tình huống: </u></b>
 ${condition?.tinhHuong?.map((value) => {
		return `<blockquote expandable>${value.name}</blockquote>`;
 }).join("\n")}

`.trim();

	return responseData;
};

const grammarCBD = async (bot) => {
	bot.command('CBD', async (ctx) => {
		try {
			const message = await getCBD('CBD');
			console.log('Message:', message); 
			bot.telegram.sendMessage(ctx.message.from.id, message, {
				parse_mode: 'HTML',
			});
		} catch (error) {
			console.error('Error:', error); 
		}
	});




};

module.exports = { grammarCBD };
