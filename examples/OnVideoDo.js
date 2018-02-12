
const TeleBot = require('../');

const token = require('../cfg/set.json').token

const bot = new TeleBot({
    token: token, // Required. Telegram Bot API token.
    polling: { // Optional. Use polling.
        interval: 2000, // Optional. How often check updates (in ms).
        timeout: 0, // Optional. Update polling timeout (0 - short polling).
        limit: 100, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    }});

// On every text message
bot.on('text', msg => {
    let id = msg.from.id;
    let text = msg.text;
    return bot.sendMessage(id, `You said: ${ text }`);
});

bot.on('video', msg=>
{
    let id = msg.from.id;
    let text = msg.text;
    return bot.sendMessage(id, `You sent vido to me`);

});


bot.on(['*', '/*'], (msg, self) => {
    let id = msg.from.id;
    let replyToMessage = msg.message_id;
    let type = self.type;
    let parseMode = 'html';
    return bot.sendMessage(
        id, `This is a <b>${ type }</b> message.`, {replyToMessage, parseMode}
    );
});

bot.connect();