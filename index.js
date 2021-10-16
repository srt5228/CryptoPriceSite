const express = require('express');
const path = require('path');
const axios = require('axios');
const http = require('http');
const cors = require('cors');
const app = express();
// Set up our http server for serving react app
const server = http.createServer(app);
server.listen(5000)
const WebSocket = require('ws')

// WebSocket connection to Coinbase
const webSocket = new WebSocket('wss://ws-feed.exchange.coinbase.com')
// On connection with coinbase, send a subscribe message with desired tokens
// In our case, ETH and BTC
webSocket.on('open', function open() {
    const message = {
        "type": "subscribe",
        "product_ids":[
            "BTC-USD",
            "ETH-USD"
        ],
        "channels":["ticker"]
    }
    webSocket.send(JSON.stringify(message))
})

// realtime will hold an object with the following:
// Coin Identifier - Best Bid (buy) Best Ask (sell)
let coinbaseRealtimeBTC = null
let coinbaseRealtimeETH = null
webSocket.on('message', function incoming(message) {
    let jsonObject = JSON.parse(message)

    if (jsonObject.product_id === 'ETH-USD') {
        coinbaseRealtimeETH = {
            token: 'ETH',
            bid: jsonObject.best_bid,
            ask: jsonObject.best_ask
        }
        console.log(coinbaseRealtimeETH)
    } else if (jsonObject.product_id === 'BTC-USD') {
        coinbaseRealtimeBTC = {
            token: 'BTC',
            bid: jsonObject.best_bid,
            ask: jsonObject.best_ask
        }
        console.log(coinbaseRealtimeBTC)
    }
})

// Serving static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());


// API ENDPOINTS - all will be under /api
app.get('/api/coinbase/realtime', (req, res) => {
    res.status(200).send({coinbaseRealtimeBTC, coinbaseRealtimeETH})

})
app.get('/api/kraken/BTC', (req, res) => {
    axios.get('https://api.kraken.com/0/public/Spread?pair=XBTUSD')
        .then(data => {
            res.status(200).json(data.data.result.XXBTZUSD)
        })
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
