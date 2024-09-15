import axios from "axios";
import "dotenv/config";

interface Options {
    botToken: string;
    chatId: string;
}

class Sender {
    private chatId: string;
    private botToken: string;
    private baseURL: string;

    /**
     * Initialize the Sender class with the options object
     * @param {Object} options - The options object.
     */
    constructor(options: Options) {        
        this.chatId = process.env.TELEGRAM_CHAT_ID || options.chatId;
        this.botToken = process.env.TELEGRAM_BOT_TOKEN || options.botToken;
        this.baseURL = `https://api.telegram.org/bot${this.botToken}`;
    }

    /**
     * Send an information log to the Telegram chat.
     * @param {string} msg 
     */
    async info(msg: string): Promise<void> {
        const message = formatMessage("info", msg);
        await sendMessage(this.baseURL, this.chatId, message);
    };

    /**
     * Send an error log to the Telegram chat.
     * @param {string} msg 
     */
    async error(msg: string): Promise<void> {
        const message = formatMessage("error", msg);
        await sendMessage(this.baseURL, this.chatId, message);
    };


    /**
     * Send a warning log to the Telegram chat.
     * @param {string} msg 
     */
    async warn(msg: string): Promise<void> {
        const message = formatMessage("warn", msg);
        await sendMessage(this.baseURL, this.chatId, message);
    };

    /**
     * Send an regular text log to the Telegram chat.
     * @param {string} msg 
     */
    async log(msg: string): Promise<void> {
        const message = formatMessage("log", msg);
        await sendMessage(this.baseURL, this.chatId, message);
    };
}

/**
 * Makes the API call to the Telegram API to send a message.
 * @param {string} baseURL
 * @param {string} text 
 * @param {string} chatId
 * @returns {Promise}
 */
async function sendMessage(baseURL: string, chatId: string, text: string): Promise<any> {
    return new Promise((resolve, reject) => {

        axios.post(`${baseURL}/sendMessage`, {
            chat_id: chatId,
            text
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });

    });
}

/**
 * Formats the message to be sent based on the type.
 * @param {string} type 
 * @param {string} msg 
 * @returns {string}
 */
function formatMessage(type: string, msg: string): string {
    // Format: 9/9/2024, 6:32:02 PM
    const timestamp = new Date().toLocaleString();

    switch (type) {
        case "info":
            return `ℹ️ ${msg}\n\nTimestamp: ${timestamp}`;
        case "error":
            return `❌ ${msg}\n\nTimestamp: ${timestamp}`;
        case "warn":
            return `⚠️ ${msg}\n\nTimestamp: ${timestamp}`;
        default:
            return `${msg}\n\nTimestamp: ${timestamp}`;
    }
}

export default Sender;
