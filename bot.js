// First importing
const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");
const keys = require('./keys');
// Storing API's key into a const variable
const botToken = keys.key1;

const openaiToken = keys.key2;

const config = new Configuration({
    apiKey: openaiToken,
});

const openai = new OpenAIApi(config);


// With below line of code we can control our telgram using vscode
const bot = new Telegram(botToken, { polling: true});

//With below line of code we can listen to the messages sent by the users
// bot.on("message", async (msg) => {
//     const chatId = msg.chat.id;

//     const reply = await openai.createCompletion({
//         max_tokens: 100,
//         model: "ada",
//         prompt: msg.text,
//         temperature: 0.6,

//     });

//     bot.sendMessage(chatId, reply.data.choices[0].text);
// });

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const processingMessage = await bot.sendMessage(chatId, "Processing...");
    try {
      const reply = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: msg.text }],
      });
      await bot.editMessageText(reply.data.choices[0].message.content, {
        chat_id: chatId,
        message_id: processingMessage.message_id,
      });
    } catch (err) {
      console.log("err1");
    }
  });
  
  bot.onText(/^\/about/, async (msg) => {
    const chatId = msg.chat.id;
    const text = "Vansh is my papa."
    bot.sendMessage(chatId, text);
});
