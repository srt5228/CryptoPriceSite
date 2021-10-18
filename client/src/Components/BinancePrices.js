import React, {useState, useEffect} from 'react';
import axios from 'axios';

function BinancePrices({exchangeData}) {

    return (
        <>
            <h1>Binance: BTC BUY {exchangeData.binance[0].bid} SELL {exchangeData.binance[0].ask}</h1>
            <h1>Binance: ETH BUY {exchangeData.binance[1].bid} SELL {exchangeData.binance[1].ask}</h1>

        </>
    )
}

export default BinancePrices;