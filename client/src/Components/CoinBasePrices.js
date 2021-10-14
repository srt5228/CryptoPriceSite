import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CoinBasePrices() {
    // Setting state - current prices from different exchanges
    const [buyBtcCoin, setBuyBtcCoin] = useState();

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE - KRAKEN -
    useEffect(() => {
        axios.get("/api/coinbase/BTC")
            .then(res => {
                let btcData = res.data
                setBuyBtcCoin(btcData)
            });
        const interval = setInterval(() => {
            axios.get("/api/coinbase/BTC")
                .then(res => {
                    let btcData = res.data
                    setBuyBtcCoin(btcData)

                });
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <h1>Coinbase: {buyBtcCoin}</h1>

        </>
    )
}

export default CoinBasePrices;