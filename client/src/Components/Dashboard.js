import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CoinBasePrices from "./CoinBasePrices";
import KrakenBasePrices from "./KrakenPrices";
import BinancePrices from "./BinancePrices";

function Dashboard() {

    return (
        <>
            <CoinBasePrices/>
            <KrakenBasePrices/>
            <BinancePrices/>
        </>
    )
}

export default Dashboard;