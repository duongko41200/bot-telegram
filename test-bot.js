const { Telegraf } = require("telegraf");

// Khởi tạo bot với API token
const bot = new Telegraf("6893164702:AAEPdDlqfEy20Np_goXO7R-9cqAgfelPys0");

// Câu hỏi trắc nghiệm mẫu
const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
];

// Cấu trúc lưu trữ trạng thái câu hỏi của người dùng
const userSessions = {};

// Xử lý lệnh /start
bot.start((ctx) => {
  const chatId = ctx.chat.id;

  // Bắt đầu quiz
  startQuiz(ctx);
});

// Hàm bắt đầu quiz
function startQuiz(ctx) {
  const chatId = ctx.chat.id;

  // Khởi tạo phiên làm việc cho người dùng
  userSessions[chatId] = {
    questionIndex: 0,
    score: 0,
  };

  // Gửi câu hỏi đầu tiên
  sendQuestion(ctx);
}

// Hàm gửi câu hỏi
function sendQuestion(ctx) {
  const chatId = ctx.chat.id;
  const session = userSessions[chatId];

  if (session.questionIndex < quiz.length) {
    const question = quiz[session.questionIndex];
    const options = question.options.map((opt) => ({
      text: opt,
      callback_data: opt,
    }));

    // Gửi câu hỏi với các lựa chọn
    ctx.reply(question.question, {
      reply_markup: {
        inline_keyboard: [options],
      },
    });
  } else {
    // Khi hết câu hỏi, gửi kết quả
    sendResults(ctx);
  }
}

// Hàm xử lý khi người dùng chọn đáp án
bot.on("callback_query", (ctx) => {
  const chatId = ctx.chat.id;
  const answer = ctx.callbackQuery.data;
  const session = userSessions[chatId];

  const correctAnswer = quiz[session.questionIndex].correctAnswer;

  let feedback = "";
  let updatedOptions = quiz[session.questionIndex].options.map((opt) => {
    if (opt === answer) {
      // Đánh dấu nút đã chọn
      return opt === correctAnswer ? `✅ ${opt}` : `❌ ${opt}`;
    }
    return opt;
  });

  // Kiểm tra đáp án và cập nhật điểm
  if (answer === correctAnswer) {
    session.score++;
    feedback = "Correct answer!";
  } else {
    feedback = `Wrong answer! The correct answer is: ${correctAnswer}`;
  }

  // Gửi kết quả câu trả lời và chuyển sang câu hỏi tiếp theo
  ctx.reply(feedback);

  // Gửi lại câu hỏi với các nút đã được cập nhật
  ctx.editMessageReplyMarkup({
    inline_keyboard: [
      updatedOptions.map((opt) => ({
        text: opt,
        callback_data: opt,
      })),
    ],
  });

  // Di chuyển đến câu hỏi tiếp theo
  session.questionIndex++;
  setTimeout(() => sendQuestion(ctx), 1000); // Đợi 2 giây trước khi gửi câu hỏi tiếp theo
});

// Hàm gửi kết quả khi hoàn thành quiz
function sendResults(ctx) {
  const chatId = ctx.chat.id;
  const session = userSessions[chatId];
  const totalQuestions = quiz.length;
  const correctAnswers = session.score;
  const wrongAnswers = totalQuestions - correctAnswers;

  ctx.reply(
    `Quiz Completed! You answered ${correctAnswers} out of ${totalQuestions} correctly.\n\nIncorrect Answers: ${wrongAnswers}`
  );

  // Xóa session người dùng
  delete userSessions[chatId];
}

// Khởi động bot
bot.launch();
