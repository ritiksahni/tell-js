# tell.js

A Node.js logging library for sending alerts on a Telegram bots.

## Example

```js
import Tell from 'tell.js';

const logger = new Tell({
    chatId: "<INSERT CHAT ID",
    botToken: "<INSERT TELEGRAM BOT TOKEn>"
})


logger.info("This is information");
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.log("A regular log message.")
```