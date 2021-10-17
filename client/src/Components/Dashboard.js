import React, {useState, useEffect} from 'react';
import CoinBasePrices from "./CoinBasePrices";
import KrakenPrices from "./KrakenPrices";
import BinancePrices from "./BinancePrices";


const ENDPOINT = "ws://127.0.0.1:5000"

function Dashboard() {




    return (
        <>
            <CoinBasePrices/>
            <KrakenPrices/>
            <BinancePrices/>
        </>
    )
}

export default Dashboard;