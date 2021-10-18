import React, {useState, useEffect} from 'react';
import axios from "axios";

function BestPrices({exchangePrices}) {
    const [intervalCount, setintervalCount] = useState(0)
    const [exchangesTotal, setExchangesTotal]
    useEffect(() => {
        setPrices(exchangePrices)
        const interval = setInterval(() => {
           setPrices(exchangePrices)
        }, 2000);
    }, [])

    return(
        <>
            Coin Base Average Price
        </>
    )
}
export default BestPrices