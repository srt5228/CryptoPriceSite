import React, {useState, useEffect} from 'react';
import CoinBasePrices from "./CoinBasePrices";
import KrakenPrices from "./KrakenPrices";
import BinancePrices from "./BinancePrices";
import BestPrices from "./Best Prices";
import axios from "axios";

function Dashboard() {
    // Setting up shared state for uniform data updates and processing
    const [realtimeData, setrealtimeData] = useState();
    // this is to keep components from trying to render null values
    const [initialDataPull, setInitialDataPull] = useState(false);


    // Hook to autorun our initial api hits and get our prices from
    // all exchanges
    useEffect(() => {
        // Initial API hit on page load
        axios.get("/api/realtime")
            .then(res => {
                setrealtimeData(res.data)
                setInitialDataPull(true)
            });
        // Hit API every second - this pulls data being gathered from coinbase websocket feed
        // 2 second seemed like the proper balance for rendering accuracy - also even number for finding
        // price avgs
        const interval = setInterval(() => {
            axios.get("/api/realtime")
                .then(res => {
                    setrealtimeData(res.data)
                });
        }, 2000);
        // cleanup our interval
        return () => clearInterval(interval);
    }, []);
    console.log(realtimeData)


    return (
        <>
        {initialDataPull
            ?
            <>
                <CoinBasePrices exchangeData={realtimeData}/>
                <KrakenPrices exchangeData={realtimeData}/>
                <BinancePrices exchangeData={realtimeData}/>
            </>
            : "pulling data"}
        </>
    );
};

export default Dashboard;