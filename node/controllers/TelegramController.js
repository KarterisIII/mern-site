import TelegramBot from 'node-telegram-bot-api'


const token = '1707780574:AAFp86J32cZK2BNV9Q-bPTntDIRueoCSEuk';
const bot = new TelegramBot(token, {polling: true});
const chatId = '389377004';


export const createTelegramPost = (req, res)=> {		
	const {tel, name, address, tarif} = req.body;	
	res.send(bot.sendMessage(chatId, `тариф: ${tarif} Имя: ${name}, телефон: ${tel}, адрес: ${address} `));
};