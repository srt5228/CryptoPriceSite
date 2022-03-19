import {Link} from "react-router-dom";

function BinancePrices({exchangeData}) {

    return (
        <>
            <Link to="/"><b>Home</b></Link>
            <h1>Binance Crypto Exchange</h1>
            <h1>BTC BUY {exchangeData.binance[0].bid} SELL {exchangeData.binance[0].ask}</h1>
            <h1>ETH BUY {exchangeData.binance[1].bid} SELL {exchangeData.binance[1].ask}</h1>

        </>
    )
}

export default BinancePrices;