import React, {useState, useEffect} from 'react';
import axios from "axios";

function Weather({}) {
    const [weather, setWeather] = useState("")


    useEffect(() => {
        axios.get("/api/weather")
            .then(res => {
                setWeather(res.data.weather)
            });
    }, [])

    return(
        <>
            <p className="weather">{weather}</p>
        </>
    )
}
export default Weather