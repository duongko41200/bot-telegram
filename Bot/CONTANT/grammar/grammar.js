const tabulate = require('tabulate');

const Table = require('cli-table');

const TOPIC_GRAMMAR = `
Hướng dẫn đăng ký sử dụng App:
1. /Tenses - 12 thì thông dụng 
2. /CDK  - Câu điều kiện
3. /CBD  - Câu bị động
4. /CGT - Câu gián tiếp
5. /MDQH - Mệnh đề quan hệ
6. /CML - Câu mệnh lệnh
7. /CCT - Câu cảm thán
8. /CPD - Câu phủ định
9. /MDSS - Mệnh đề so sánh

  Tốt hơn mỗi ngày 1%
`;

const TOPIC_THI = `

1. /HTD - Thì Hiện Tại đơn
2. /HTTD - Thì Hiện Tại Tiếp Diễn
3. /HTHT - Thì Hiện Tại Hoàn Thành
4. /HTHTTD - Thì Hiện Tại Hoàn Thành Tiếp Diễn
5. /QKD - Thì Quá Khứ Đơn
6. /QKTD - Thì Quá Khứ Tiếp Diễn
7. /QKHT - Thì Quá Khứ Hoàn Thành
8. /QKHTTD - Thì Quá Khứ Hoàn Thành Tiếp Diễn
9. /TLD - Thì Tương Lai Đơn
10. /TLTD - Thì Tương Lai Tiếp Diễn
11. /TLHT - Thì Lai Hoàn Thành
12. /TLHTTD - Tương lại Hoàn thành tiếp diễn

`;
const TOPIC_CDK = `
📜 <b>English Tenses</b>

1. <b>Present Tenses:</b>
   - <b>Present Simple:</b> 
     - Structure: <code>Subject + V1 (s/es)</code>
     - Example: <code>He eats.</code>
   - <b>Present Continuous:</b> 
     - Structure: <code>Subject + am/is/are + V-ing</code>
     - Example: <code>He is eating.</code>
   - <b>Present Perfect:</b> 
     - Structure: <code>Subject + have/has + V3</code>
     - Example: <code>He has eaten.</code>
   - <b>Present Perfect Continuous:</b> 
     - Structure: <code>Subject + have/has been + V-ing</code>
     - Example: <code>He has been eating.</code>

2. <b>Past Tenses:</b>
   - <b>Past Simple:</b> 
     - Structure: <code>Subject + V2</code>
     - Example: <code>He ate.</code>
   - <b>Past Continuous:</b> 
     - Structure: <code>Subject + was/were + V-ing</code>
     - Example: <code>He was eating.</code>
   - <b>Past Perfect:</b> 
     - Structure: <code>Subject + had + V3</code>
     - Example: <code>He had eaten.</code>
   - <b>Past Perfect Continuous:</b> 
     - Structure: <code>Subject + had been + V-ing</code>
     - Example: <code>He had been eating.</code>

3. <b>Future Tenses:</b>
   - <b>Future Simple:</b> 
     - Structure: <code>Subject + will + V1</code>
     - Example: <code>He will eat.</code>
   - <b>Future Continuous:</b> 
     - Structure: <code>Subject + will be + V-ing</code>
     - Example: <code>He will be eating.</code>
   - <b>Future Perfect:</b> 
     - Structure: <code>Subject + will have + V3</code>
     - Example: <code>He will have eaten.</code>
   - <b>Future Perfect Continuous:</b> 
     - Structure: <code>Subject + will have been + V-ing</code>
     - Example: <code>He will have been eating.</code>


`;

const TEST = `
<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>
<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>
`;



const HTD = `

 📜<b>Thì Hiện Tại Đơn</b> (<i>Present Simple Tense</i>) \n
<b><u>Diễn tả:</u></b>
|<b>-------------------------------------------</b>
|   1️⃣ sự thật hiển nhiên, chân lý                 
|   2️⃣ thói quen hằng ngày(<i> Lặp đi lặp lại</i>)  
|   3️⃣ Lịch trình, thời gian biểu...               
|   4️⃣ cảm xúc, cảm giác, suy nghĩ                  
|<b>-------------------------------------------</b>

 <b><u>công thức:</u></b>
<pre><code class="language-khang-dinh">Subject + V1 (s/es) + Object</code></pre>
<pre><code class="language-phu-dinh">Subject + do/does + not + V1 + Object</code></pre>
<pre><code class="language-cau-hoi">Do/Does + Subject + V1 + Object?</code></pre>

 <b><u>Tình huống: </u></b>
<blockquote expandable>
📌 Bạn gặp một người bạn và hỏi về thói quen hàng ngày của họ:\n
You: What do you do every morning?
Friend: I usually go for a run and then have breakfast.
</blockquote>
<blockquote expandable>
📌 Bạn đang nói về sự thật hiển nhiên với ai đó:\n
Did you know that water boils at 100 degrees Celsius
</blockquote>
<blockquote expandable>
📌 Bạn hỏi về lịch trình của một sự kiện:\n
You: What time does your flight take off?
Friend: My flight takes off at 7:00 in the morning.
</blockquote>

`;


module.exports = {
	TOPIC_GRAMMAR,
	TOPIC_THI,
	TOPIC_CDK,
	TEST,
	HTD,
};
