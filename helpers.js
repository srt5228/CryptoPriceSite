
// COINBASE HELPERS
// Checks what coin pair we are setting up in order to pass
// Correct data object for front end transmission ex (ETH-USD)
exports.coinBaseNameCheck = (pair) => {
    if (pair === "ETH-USD") {
        return "ETH"
    } else if (pair === "BTC-USD") {
        return "BTC"
    };
    return "Bad Coin Pair Value"
};
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

// KRAKEN HELPERS
// Checks the coin pair we are setting up in order
// to pass correct data object for front end transmission ex (ETH/USD)
exports.krakenNameCheck = (pair) => {
    if (pair === "ETH/USD") {
        return "ETH"
    } else if (pair === "XBT/USD") {
        return "BTC"
    };
    return "Bad Coin Pair Value"
};
// Checks whether the incoming message is snapshot or
// update from book feed and modifies passed dataObject accordingly
// payload - websocket feed data dataObject - front end data object
exports.krakenAssignValues = (payload, dataObject, datatypes) => {
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


