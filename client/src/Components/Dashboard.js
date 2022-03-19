import React from 'react';
import {Link} from "react-router-dom";
import Weather from "./Weather";

function Dashboard({}) {
    return (
        <>
            <h1>Crypto Price Site</h1>
            <Weather/>
            <p>This website tracks realtime data across the exchanges listed below. Click the button associated with each
                exchange in order to see current prices there.</p>
            <Link to="/CoinBase"><b>Coinbase</b> <br></br></Link>
            <Link to="/Binance"><b>Binance</b> <br></br></Link>
            <Link to="/Kraken"><b>Kraken</b> <br></br></Link>
        </>

    );
};

export default Dashboard;