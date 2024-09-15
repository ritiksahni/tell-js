/**
 * Welcome to tell.js - a simple logging library for Telegram.
 * @author Ritik Sahni <ritik@ritiksahni.com> 
*/

import Sender from './sender.js'; // Ensure the correct path to Sender.js

interface Options {
    botToken: string;
    chatId: string;
}


/**
 * Tell class for logging messages to Telegram.
 */
class Tell {
    private logger: Sender;
    /**
     * Initialize the Tell class with the options object.
     * @param {Object} options - The options object.
     * @param {string} [options.botToken] - The bot token (optional if TELEGRAM_BOT_TOKEN environment variable is set).
     * @param {string} options.chatId - The chat ID (required).
     */
    constructor(options: Options) {
        this.logger = new Sender(options);
    }

    /**
     * Log an info message.
     * @param {string} msg - The message to log.
     */
    info(msg: string) {
        this.logger.info(msg).catch(console.error);
    }

    /**
     * Log an error message.
     * @param {string} msg - The message to log.
     */
    error(msg: string) {
        this.logger.error(msg).catch(console.error);
    }

    /**
     * Log a warning message.
     * @param {string} msg - The message to log.
     */
    warn(msg: string) {
        this.logger.warn(msg).catch(console.error);
    }

    /**
     * Log a regular message.
     * @param {string} msg - The message to log.
     */
    log(msg: string) {
        this.logger.log(msg).catch(console.error);
    }
}

export { Tell };
export default Tell;
