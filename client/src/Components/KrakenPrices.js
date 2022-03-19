import {Link} from "react-router-dom";


function KrakenPrices({exchangeData}) {

    return (
        <>
            <Link to="/"><b>Home</b></Link>
            <h1>Kraken Crypto Exchange</h1>
            <h1>BTC: BUY {exchangeData.kraken[0].bid} SELL {exchangeData.kraken[0].ask}</h1>
            <h1>ETH: BUY {exchangeData.kraken[1].bid} SELL {exchangeData.kraken[1].ask}</h1>

        </>
    )
}

export default KrakenPrices;