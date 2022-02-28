const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
// our custom websocket interfaces
const ws = require("./websocketfactory.js");
// Set up our http server for serving react app
const server = http.createServer(app);
server.listen(process.env.PORT || 5000)

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
// Websocket connection to Binance
let binanceRealTimeBTC = {bid: null, ask:null}
let binanceRealTimeETH = {bid: null, ask: null}
ws.buildBinanceWebsocket(binanceRealTimeBTC, binanceRealTimeETH)
console.log("Binance Feed Online")

// Serving static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));


// API ENDPOINTS - all will be under /api
app.get('/api/coinbase/realtime', (req, res) => {
    res.status(200).send({coinbaseRealTimeBTC, coinbaseRealTimeETH})
})

app.get('/api/kraken/realtime', (req, res) => {
    res.status(200).send({krakenRealTimeBTC, krakenRealTimeETH})
})

app.get('/api/binance/realtime', (req, res) => {
    res.status(200).send({binanceRealTimeBTC, binanceRealTimeETH})
})

// main endpoint - sends all data objects combined for each exchange with array of values for [BTC, ETH]
app.get('/api/realtime', (req, res) => {
    res.status(200).send(
        {coinbase: [coinbaseRealTimeBTC, coinbaseRealTimeETH],
                kraken: [krakenRealTimeBTC, krakenRealTimeETH],
                binance: [binanceRealTimeBTC, binanceRealTimeETH]}
    );
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
// app.get('/api/binance/BTC', (req, res) => {
//     axios.get('https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT')
//         .then(data => {
//             res.status(200).json(data.data)
//         })
// })
