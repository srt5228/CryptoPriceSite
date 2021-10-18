import React, {useState, useEffect} from 'react';
import axios from 'axios';

function KrakenPrices({exchangeData}) {

    return (
        <>
            <h1>Kraken: BTC BUY {exchangeData.kraken[0].bid} SELL {exchangeData.kraken[0].ask}</h1>
            <h1>Kraken: ETH BUY {exchangeData.kraken[1].bid} SELL {exchangeData.kraken[1].ask}</h1>

        </>
    )
}

export default KrakenPrices;