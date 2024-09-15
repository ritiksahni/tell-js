# tell-js

[![npm version](https://img.shields.io/npm/v/tell-js.svg)](https://www.npmjs.com/package/tell-js)
![NPM Downloads](https://img.shields.io/npm/dw/tell-js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

A lightweight and easy-to-use Node.js logging library that sends alerts via Telegram bots.

## Features

- Simple and intuitive API
- Supports multiple log levels (info, error, warn, log)
- Sends log messages directly to your Telegram chat
- Easy integration with existing Node.js projects

## Installation

```bash
npm install tell.js
```

## Usage

```javascript
import Tell from 'tell.js';

const logger = new Tell({
    chatId: "YOUR_CHAT_ID",
    botToken: "YOUR_BOT_TOKEN"
});

logger.info("This is information");
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.log("A regular log message.");
```

## Configuration

To use `tell.js`, you need to provide two pieces of information:

1. Telegram Bot Token
2. Chat ID

### Creating a Telegram Bot Token

1. Open Telegram and search for the `@BotFather` bot.
2. Start a chat and send the command `/newbot`.
3. Follow the prompts to choose a name and username for your bot.
4. Once created, BotFather will provide you with a token. This is your `BOT_TOKEN`.

### Getting Your Chat ID

1. Start a chat with your newly created bot.
2. Send a message to the bot.
3. Open this URL in your browser, replacing `<BOT_TOKEN>` with your actual bot token:
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Look for the `"chat":{"id":` field in the response. The number after it is your `CHAT_ID`.

### Integrating with Winston

```js
import winston from 'winston';
import Tell from 'tell.js';
import { Writable } from 'stream';

const tell = new Tell({
    chatId: "YOUR_CHAT_ID",
    botToken: "YOUR_BOT_TOKEN"
});

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.Stream({
            stream: new Writable({
                write: (msg: string) => {
                    // Use tell-js methods here.
                    tell.log(msg);
                    return true;
                }                
            })
        })
    ]
});
```

## FAQ

1. **Q: Is there a message size limit?**
   A: Yes, Telegram has a limit of 4096 characters per message. If your log message exceeds this, it will be split into multiple messages.

2. **Q: Can I use this in a browser environment?**
   A: No, `tell.js` is designed for Node.js environments only, as it requires access to server-side resources.

3. **Q: How secure is it to send logs via Telegram?**
   A: While Telegram provides encryption, we recommend not logging sensitive information like passwords or API keys.

## Troubleshooting

- **Messages not sending**: Ensure your bot token and chat ID are correct.
- **Rate limiting issues**: Check your `rateLimit` setting and Telegram's rate limit policies.
- **"Bot not initialized" error**: Make sure you've created the Tell instance before using logging methods.


## API Reference

### `new Tell(options)`

Creates a new Tell instance.

- `options.chatId`: Your Telegram chat ID (string)
- `options.botToken`: Your Telegram bot token (string)

### Methods

- `logger.info(message)`: Sends an info-level message
- `logger.error(message)`: Sends an error-level message
- `logger.warn(message)`: Sends a warning-level message
- `logger.log(message)`: Sends a regular log message

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0
 License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/yourusername/tell.js/issues) or send an email to the maintainer.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes to `tell.js`.

## Acknowledgements

- Thanks to the Telegram team for their excellent bot API.
- Inspired by the logging strategy of [@levelsio](https://x.com/levelsio) for his projects.