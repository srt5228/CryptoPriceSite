import React, {useState, useEffect} from 'react';
import '../App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import CoinBasePrices from "./CoinBasePrices";
import KrakenPrices from "./KrakenPrices";
import BinancePrices from "./BinancePrices";
import axios from "axios";

function App() {
    // Setting up shared state for uniform data updates and processing
    const [realtimeData, setrealtimeData] = useState();
    // this is to keep components from trying to render null values
    const [initialDataPull, setInitialDataPull] = useState(false);
    // this will track average prices to determine the best price
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
        <div className="App">
          <Router>
            <Route path="/" exact>
                <Dashboard realtimeData={realtimeData}/>
            </Route>
              <Route path="/CoinBase">
                  <CoinBasePrices exchangeData={realtimeData}/>
              </Route>
              <Route path="/Kraken">
                  <KrakenPrices exchangeData={realtimeData}/>
              </Route>
              <Route path="/Binance">
                  <BinancePrices exchangeData={realtimeData}/>
              </Route>
          </Router>
        </div>
          : "pulling data"}
      </>
  );
}

export default App;
