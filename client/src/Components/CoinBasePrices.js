import React, {useState, useEffect} from 'react';
import axios from 'axios';

function CoinBasePrices({exchangeData}) {

    return (
        <>
            <h1>Coinbase: BTC BUY {exchangeData.coinbase[0].bid} SELL {exchangeData.coinbase[0].ask}</h1>
            <h1>Coinbase: ETH BUY {exchangeData.coinbase[1].bid} SELL {exchangeData.coinbase[1].ask}</h1>

        </>
    )
}

export default CoinBasePrices;