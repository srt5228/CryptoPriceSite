import React, {useState, useEffect} from "react";
import axios from "axios";

function Dashboard() {
    // Setting state - current prices from different exchanges
    const [buyBtcCoin, setBuyBtcCoin] = useState();

    // Hook to autorun our initial api hits and get our prices from
    // COINBASE
    useEffect(() => {
        axios.get("/api/coinbase/BTC")
            .then(res => {
                setBuyBtcCoin(res.data)
            });

    })

    return (
        <h1>{buyBtcCoin}</h1>
    )
}