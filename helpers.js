// Filters out unnecessary string characters to identify
// what crypto we are working with pair - crypto pair
exports.nameCheck = (pair, exchange) => {
    if (exchange === "coinbase") {
        return pair.replace(/-USD/i, '')
    } else if (exchange === "kraken") {
        return pair.replace(/\/USD/i, '') === "XBT" ? "BTC" : "ETH"
    } else if (exchange === "binance") {
        return pair.replace(/USDT/i, '')
    }

}

// Checks whether the incoming message is an initial snapshot
// from Level 2 book feed or an update and modifies passed object
// accordingly
exports.coinAssignValues = (payload, dataObject) => {
    if (payload.type === "snapshot") {
        dataObject = {
            bid: payload.bids[0][0],
            ask: payload.asks[0][0]
        };
    } else if (payload.type = "l2update") {
        if (payload.changes[0][0] === "sell") {
            dataObject.ask = payload.changes[0][1]
        } else if (payload.changes[0][0] === "buy") {
            dataObject.bid = payload.changes[0][1]
        };
    };
};

// Checks whether the incoming message is snapshot or
// update from book feed and modifies passed dataObject accordingly
// payload - websocket feed data dataObject - front end data object
exports.krakenAssignValues = (payload, dataObject) => {
    if ('as' in payload) {
        dataObject.ask = parseFloat(payload.as[0][0]).toFixed(2)
    };
    if ('bs' in payload) {
        dataObject.bid = parseFloat(payload.bs[0][0]).toFixed(2)
    };
    if ('a' in payload) {
        dataObject.ask = parseFloat(payload.a[0][0]).toFixed(2)

    };
    if ('b' in payload) {
        dataObject.bid = parseFloat(payload.b[0][0]).toFixed(2)
    };
};

// Updates passed front end payload with current book data from binance
exports.binanceAssignValues = (payload, dataObject) => {
    dataObject.ask = parseFloat(payload.a).toFixed(2)
    dataObject.bid = parseFloat(payload.b).toFixed(2)
}


