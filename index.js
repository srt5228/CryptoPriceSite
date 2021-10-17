const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
// our custom websocket interfaces
const ws = require("./websocketfactory.js");
// Set up our http server for serving react app
const server = http.createServer(app);
server.listen(5000)

// WebSocket connection to Coinbase
let coinbaseRealTimeBTC = {bid: 0, ask: 0}
let coinbaseRealTimeETH = {bid: 0, ask: 0}
ws.buildCoinBaseWebSocket(coinbaseRealTimeBTC, coinbaseRealTimeETH)
console.log("Coinbase Websocket Feed Online")
// Websocket connection to Kraken
let krakenRealTimeBTC = {bid: null, ask:null}
let krakenRealTimeETH = {bid: null, ask: null}
ws.buildKrakenWebSocket(krakenRealTimeBTC, krakenRealTimeETH)
console.log("Kraken Websocket Feed Online")



// WebSocket conection to Binance
// const binanceWebSocket = new WebSocket('wss://stream.binance.com:9443')

// Setting up streams by sending subscription messages to each provider

// binanceWebSocket.on('open', function open() {
//     const message = {
//         "method": "subscribe",
//         "params": [
//
//         ],
//         "id": 1
//     }
// })






// Serving static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(cors());


// API ENDPOINTS - all will be under /api
app.get('/api/coinbase/realtime', (req, res) => {
    res.status(200).send({coinbaseRealTimeBTC, coinbaseRealTimeETH})
})

app.get('/api/kraken/realtime', (req, res) => {
    res.status(200).send({krakenRealTimeBTC, krakenRealTimeETH})
})


app.get('/api/binance/BTC', (req, res) => {
    axios.get('https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT')
        .then(data => {
            res.status(200).json(data.data)
        })
})


// Any request that doesn't match anything above will be redirected to React homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});







// OLD ENDPOINTS
// app.get('/api/coinbase/BTC', (req, res) => {
//     axios.get('https://api.exchange.coinbase.com/products/BTC-USD/ticker')
//         .then(data => {
//             res.status(200).json(data.data.bid)
//         })
// })
// app.get('/api/kraken/BTC', (req, res) => {
//     axios.get('https://api.kraken.com/0/public/Spread?pair=XBTUSD')
//         .then(data => {
//             res.status(200).json(data.data.result.XXBTZUSD)
//         })
// })
