const TelegramApi = require('node-telegram-bot-api')
const token = '6395389958:AAGFSctqmTq-pINz1M3SRx5yaAwaZJ2IG7Y'
const {gameOptions, againOptions} = require('./options.js')
const bot = new TelegramApi(token, { polling: true })



const chats = {

}




const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `now i will guess some number`)
            const randomNum = Math.floor(Math.random() * 10)
            chats[chatId] = randomNum
            await bot.sendMessage(chatId, 'guess', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'congratulations' },
        { command: '/info', description: 'get info' },
        { command: '/game', description: 'game' },
    ])
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        console.log(msg)
        if (text === '/start') {
            return bot.sendMessage(chatId, 'hello ')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name ?? ''}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `You wrote me: ${text}`)
    })

    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        //console.log(data)
        //console.log(chats[chatId])
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            
            return bot.sendMessage(chatId, `You WIN!!! ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Try more, the value was ${chats[chatId]}`,againOptions  )
        }
        
    })
}

start()