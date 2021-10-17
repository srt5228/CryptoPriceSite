import React, {useState, useEffect} from 'react';
import axios from 'axios';

function BinancePrices() {
    // Setting state - current prices from coinbase for ETH and BTC
    const [btcData, setBtcData] = useState({buy: 0, sell: 0});
    const [ethData, setEthData] = useState({buy: 0, sell: 0});

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE
    useEffect(() => {
        // Initial API hit on page load
        axios.get("/api/binance/realtime")
            .then(res => {
                let eth = {buy: res.data.binanceRealTimeETH.bid, sell: res.data.binanceRealTimeETH.ask}
                let btc = {buy: res.data.binanceRealTimeBTC.bid, sell: res.data.binanceRealTimeBTC.ask}
                setBtcData(btc)
                setEthData(eth)
            });
        // Hit API every second - this pulls data being gathered from coinbase websocket feed
        // 1 second seemed like the proper balance for rendering accuracy
        const interval = setInterval(() => {
            axios.get("/api/binance/realtime")
                .then(res => {
                    let eth = {buy: res.data.binanceRealTimeETH.bid, sell: res.data.binanceRealTimeETH.ask}
                    let btc = {buy: res.data.binanceRealTimeBTC.bid, sell: res.data.binanceRealTimeBTC.ask}
                    setBtcData(btc)
                    setEthData(eth)
                });
        }, 2000);
        // cleanup our interval
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <h1>Binance: BTC BUY {btcData.buy} SELL {btcData.sell}</h1>
            <h1>Binance ETH BUY {ethData.buy} SELL {ethData.sell}</h1>

        </>
    )
}

export default BinancePrices;