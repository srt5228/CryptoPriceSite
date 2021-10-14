import React, {useState, useEffect} from 'react';
import axios from 'axios';

function KrakenBasePrices() {
    // Setting state - current prices from different exchanges
    const [buyBtcKraken, setBuyBtcKraken] = useState();

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE - KRAKEN -
    useEffect(() => {
        axios.get("/api/kraken/BTC")
            .then(res => {
                let btcData = parseFloat(res.data[0][1]).toFixed(2);
                setBuyBtcKraken(btcData)
            });
        const interval = setInterval(() => {
            axios.get("/api/kraken/BTC")
                .then(res => {
                    let btcData = parseFloat(res.data[0][1]).toFixed(2);
                    setBuyBtcKraken(btcData)
                });
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <h1>Kraken: {buyBtcKraken}</h1>

        </>
    )
}

export default KrakenBasePrices;