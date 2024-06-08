import React, { useState, useEffect } from "react";
import "./style.css";
import Weathercard from "./Weathercard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("ahmedabad");
  const [tempInfo, setTempInfo] = useState({});
  const GetWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=71e404ed0cd56880513cbb359976a2e3`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        speed,
        sunset,
        country,
        name,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
    setSearchValue("");
  };
  useEffect(() => {
    GetWeatherInfo();
  }, []);
  const handleKey = (e) => {
    if (e.key === "Enter") {
      GetWeatherInfo();
    }
  };
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKey}
          />

          <button
            className="searchButton"
            type="button"
            onClick={GetWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
