const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Serving static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API ENDPOINTS - all will be under /api
app.get('/api/coinbase/BTC', (req, res) => {
    axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy')
        .then(data => {
            res.status(200).json(data)
        })
})


// Any request that doesn't match anything above will be redirected to React homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Crypto Price Site listening on ${port}`);