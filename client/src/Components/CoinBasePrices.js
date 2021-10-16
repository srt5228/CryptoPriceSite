import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CoinBasePrices() {
    // Setting state - current prices from coinbase for ETH and BTC
    const [btcData, setBtcData] = useState({buy: 0, sell: 0});
    const [ethData, setEthData] = useState({buy: 0, sell: 0});

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE
        useEffect(() => {
            // Initial API hit on page load
            axios.get("/api/coinbase/realtime")
                .then(res => {
                    let eth = {buy: res.data.coinbaseRealtimeETH.bid, sell: res.data.coinbaseRealtimeETH.ask}
                    let btc = {buy: res.data.coinbaseRealtimeBTC.bid, sell: res.data.coinbaseRealtimeBTC.ask}
                    setBtcData(btc)
                    setEthData(eth)
                });
            // Hit API every second - this pulls data being gathered from coinbase websocket feed
            // 1 second seemed like the proper balance for rendering accuracy
            const interval = setInterval(() => {
                axios.get("/api/coinbase/realtime")
                    .then(res => {
                        let eth = {buy: res.data.coinbaseRealtimeETH.bid, sell: res.data.coinbaseRealtimeETH.ask}
                        let btc = {buy: res.data.coinbaseRealtimeBTC.bid, sell: res.data.coinbaseRealtimeBTC.ask}
                        setBtcData(btc)
                        setEthData(eth)
                    });
            }, 1000);
            // cleanup our interval
            return () => clearInterval(interval);
        }, [])
        console.log(ethData)
        console.log(btcData)
    return (
        <>
            <h1>Coinbase: BTC BUY {btcData.buy} SELL {btcData.sell}</h1>
            <h1>Coinbase: ETH BUY {ethData.buy} SELL {ethData.sell}</h1>

        </>
    )
}

export default CoinBasePrices;