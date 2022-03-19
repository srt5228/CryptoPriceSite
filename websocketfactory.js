const WebSocket = require('ws')
const helpers = require("./helpers.js")

// Builds websocket instance with passed url and returns in to calling function
function buildWebSocket(url) {
    const webSocketInstance = new WebSocket(url);
    return webSocketInstance
}

// Exchange specific websocket builds - these will include logic for
// Sending Subscription Payload/Setting data payloads for react frontend
// Handling errors in websocket connection and reopening closed connections

// COINBASE WEBSOCKET INTERFACE
// Takes in object reference for front end data payloads
exports.buildCoinBaseWebSocket = (btcData, ethData) => {
    // SUBSCRIPTION PAYLOAD
    const endpoint = 'wss://ws-feed.exchange.coinbase.com';
    const coinBaseSubscribe = {
        "type": "subscribe",
        "product_ids":[
            "BTC-USD",
            "ETH-USD"
        ],
        "channels":["level2"]
    };

    // Creating the websocket instance and sending sub payload
    const coinbaseInstance = buildWebSocket(endpoint)
    coinbaseInstance.onopen = (event) => {
        coinbaseInstance.send(JSON.stringify(coinBaseSubscribe))
    };

    // On message we modify our front end data payloads passed from index
    coinbaseInstance.onmessage = (message) => {
        let jsonObject = JSON.parse(message.data)
        // this filters out initial subsciption status message
        if (jsonObject.type === "snapshot" || jsonObject.type === "l2update") {
            // figure out what crypto coin the message pertains to and then modify its
            // front end data payload
            const coin = helpers.nameCheck(jsonObject.product_id, 'coinbase')
            if (coin === "ETH") {
                helpers.coinAssignValues(jsonObject, ethData)
            } else if (coin === "BTC") {
                helpers.coinAssignValues(jsonObject, btcData)
            };
        };
    };

    // On connection close (likely due to error) the connection will attempt to
    // reconnect after 10 seconds
    coinbaseInstance.onclose = (event) => {
        console.log('Connection with server was closed, re-initializing in 10 seconds')
        setTimeout(module.exports.buildCoinBaseWebSocket(btcData, ethData), 10000)
    };

    // Catch any errors we encounter - in a more fleshed out app this would
    // have more specific logic for troubleshooting
    coinbaseInstance.onerror = (error) => {
        console.log('ERROR on COINBASE WEBSOCKET')
    };
}


// KRAKEN WEBSOCKET INTERFACE
// Takes in object reference for front end data payloads
exports.buildKrakenWebSocket = (btcData, ethData) => {
    // SUBSCRIPTION PAYLOAD
    const endpoint = 'wss://ws.kraken.com'
    const validData = ['a', 'b', 'as', 'bs']
    const krakenSubscribe = {
        "event": "subscribe",
        "pair": [
            "XBT/USD",
            "ETH/USD"
        ],
        "subscription": {
            "name": "book"
        }
    };

    // Creating the websocket instance and sending sub payload
    const krakenInstance = buildWebSocket(endpoint);
    krakenInstance.onopen = (event) => {
        krakenInstance.send(JSON.stringify(krakenSubscribe))
    };

    // On message we modify our front end data payloads passed from index
    // Krakens update payloads can have both bid/ask updates unlike coinbase
    // so some extra logic is needed - they also do not specify snapshot or update so need to verify that as well
    krakenInstance.onmessage = (message) => {
        let jsonObject = JSON.parse(message.data);
        // verify we are getting a snapshot or update payload

        try {
            if ('a' in jsonObject[1] || 'b' in jsonObject[1] || 'as' in jsonObject[1] || 'bs' in jsonObject[1]) {
                // figure out crypto coin the message pertains to and modify
                // its front end payload
                const coin = helpers.nameCheck(jsonObject[3], 'kraken')
                if (coin === "ETH") {
                    helpers.krakenAssignValues(jsonObject[1], ethData)
                } else if (coin === "BTC") {
                    helpers.krakenAssignValues(jsonObject[1], btcData)
                };
            };
        } catch {
          // Just catching here for when we get data back that
            // is not a snapshot or update package which would not contain
            // the object we are using a conditional against
        };
    };

    // On connection close (likely due to error) the connection will attempt to
    // reconnect after 10 seconds
    krakenInstance.onclose = function(event) {
        console.log('Connection with server was closed, re-initializing in 10 seconds')
        setTimeout(module.exports.buildKrakenWebSocket(btcData, ethData), 10000)
    };

    // Catch any errors we encounter - in a more fleshed out app this would
    // have more specific logic for troubleshooting
    krakenInstance.onerror = function(error) {
        console.log('ERROR on Kraken WEBSOCKET - Connection will attempt to be reestablished')
    };
};


// BINANCE WEBSOCKET INTERFACE
// Takes in object reference for front end data payloads
exports.buildBinanceWebsocket = (btcData, ethData) => {

    // SUBSCRIPTION PAYLOAD
    const endpoint = 'wss://stream.binance.com:9443/stream?streams=ethusdt@bookTicker/btcusdt@bookTicker'
    const binanceSubscribe = {
        "method": "SUBSCRIBE",
        "params": [
            "ethusdt@bookTicker",
            'btcusdt@bookTicker'
        ],
        "id": 1
    };

    // Creating websocket instance and sending subscribe payload
    const binanceInstance = buildWebSocket(endpoint)
    binanceInstance.onopen = (event) => {
        binanceInstance.send(JSON.stringify(binanceSubscribe))
    };

    // On message we modify our front end data payloads passed from index
    // Krakens update payloads can have both bid/ask updates unlike coinbase
    // so some extra logic is needed - they also do not specify snapshot or update so need to verify that as well
    binanceInstance.onmessage = (message) => {
        let jsonObject = JSON.parse(message.data);
        // verify we are getting a snapshot or update payload
        // binance sends a null payload to confirm subscription at times
        if ("data" in jsonObject) {
            const coin = helpers.nameCheck(jsonObject.data.s, "binance")
            if (coin === "ETH") {
                helpers.binanceAssignValues(jsonObject.data, ethData)
            } else if (coin === "BTC") {
                helpers.binanceAssignValues(jsonObject.data, btcData)
            };
        };
    };

    // On connection close (likely due to error) the connection will attempt to
    // reconnect after 10 seconds - binance also auto closes connections after 24 hrs
    binanceInstance.onclose = function(event) {
        console.log('Connection with server was closed, re-initializing in 10 seconds')
        setTimeout(module.exports.buildBinanceWebsocket(btcData, ethData), 10000)
    };

    // Catch any errors we encounter - in a more fleshed out app this would
    // have more specific logic for troubleshooting
    binanceInstance.onerror = function(error) {
        console.log('ERROR on Binance WEBSOCKET - Connection will attempt to be reestablished')
    };
};
