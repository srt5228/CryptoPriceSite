import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CoinBasePrices from "./CoinBasePrices";
import KrakenBasePrices from "./KrakenPrices";
import BinancePrices from "./BinancePrices";
import socketIOClient from "socket.io-client";

const ENDPOINT = "ws://127.0.0.1:5000"

function Dashboard() {




    return (
        <>
            <CoinBasePrices/>
            {/*<KrakenBasePrices/>*/}
            {/*<BinancePrices/>*/}
        </>
    )
}

export default Dashboard;