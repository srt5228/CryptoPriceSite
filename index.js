const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Serving static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API ENDPOINTS - all will be under /api
app.get('/api/coinbase/BTC', (req, res) => {
    axios.get('https://api.exchange.coinbase.com/products/BTC-USD/ticker')
        .then(data => {
            res.status(200).json(data.data.bid)
        })
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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Crypto Price Site listening on ${port}`);