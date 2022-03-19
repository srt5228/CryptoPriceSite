import React from 'react';
import {Link} from "react-router-dom";

function CoinBasePrices({exchangeData}) {

    return (
        <>
            <Link to="/"><b>Home</b></Link>
            <h1>CoinBase Crypto Exchange</h1>
            <h1>BTC BUY {exchangeData.coinbase[0].bid} SELL {exchangeData.coinbase[0].ask}</h1>
            <h1>ETH BUY {exchangeData.coinbase[1].bid} SELL {exchangeData.coinbase[1].ask}</h1>

        </>
    )
}

export default CoinBasePrices;