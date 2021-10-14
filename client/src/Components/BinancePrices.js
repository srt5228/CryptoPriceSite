import React, {useState, useEffect} from 'react';
import axios from 'axios';

function BinancePrices() {
    // Setting state - current prices from different exchanges
    const [buyBtcBinance, setBuyBtcBinance] = useState();

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE - KRAKEN -
    useEffect(() => {
        axios.get("/api/binance/BTC")
            .then(res => {
                let btcData = parseFloat(res.data.bidPrice).toFixed(2);
                setBuyBtcBinance(btcData)
            });
        const interval = setInterval(() => {
            axios.get("/api/binance/BTC")
                .then(res => {
                    let btcData = parseFloat(res.data.bidPrice).toFixed(2);
                    setBuyBtcBinance(btcData)
                });
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <h1>Binance: {buyBtcBinance}</h1>

        </>
    )
}

export default BinancePrices;