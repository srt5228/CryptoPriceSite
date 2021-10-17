import React, {useState, useEffect} from 'react';
import axios from 'axios';

function KrakenPrices() {
    // Setting state - current prices from different exchanges
    const [btcData, setBtcData] = useState({buy: 0, sell: 0});
    const [ethData, setEthData] = useState({buy: 0, sell: 0});

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE - KRAKEN -
    useEffect(() => {
        // Initial API hit on page load
        axios.get("/api/kraken/realtime")
            .then(res => {
                setBtcData({buy: res.data.krakenRealTimeBTC.bid, sell: res.data.krakenRealTimeBTC.ask})
                setEthData({buy: res.data.krakenRealTimeETH.bid, sell: res.data.krakenRealTimeETH.ask})
            });
        // Hit API every second - this pulls data being gathered from coinbase websocket feed
        // 1 second seemed like the proper balance for rendering accuracy
        const interval = setInterval(() => {
            axios.get("/api/kraken/realtime")
                .then(res => {
                    setBtcData({buy: res.data.krakenRealTimeBTC.bid, sell: res.data.krakenRealTimeBTC.ask})
                    setEthData({buy: res.data.krakenRealTimeETH.bid, sell: res.data.krakenRealTimeETH.ask})
                });
        }, 2000);
        // cleanup our interval
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <h1>Kraken BTC BUY {btcData.buy} SELL {btcData.sell}</h1>
            <h1>Kraken  ETH BUY {ethData.buy} SELL {ethData.sell}</h1>
        </>
    )
}

export default KrakenPrices;