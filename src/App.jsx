import React from "react";
import { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [option, setOption] = useState("option1");
  const apiKey = "5580f761ff8fe8b45ff0a51968df2444";

  const handleOptionChange = (option) => {
    setOption(option);
  };

  const apiCall1 = async (e) => {
    e.preventDefault();
    const loc = e.target.elements.loc.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
    const req = axios.get(url);
    const res = await req;
    setWeather({
      descp: res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      humidity: res.data.main.humidity,
      press: res.data.main.pressure,
    });

    setCity(res.data.name);
  };

  const apiCall2 = async (e) => {
    e.preventDefault();
    const loc = e.target.elements.loc.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${loc},IN&appid=${apiKey}`;
    const req = axios.get(url);
    const res = await req;
    setWeather({
      descp: res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      humidity: res.data.main.humidity,
      press: res.data.main.pressure,
    });

    setCity(res.data.name);
  };

  //Converting K to C
  let k = weather.temp;
  let C = k - 273.15;

  const WeatherInfo = () => {
    return (
      <div>
        <div className="winfo">
          Weather information for {city}
        </div>
          <br />
          <hr color="white"></hr><br />
        <div className="Weath">
          <div className="welement">Weather: {weather.descp}</div>
          <div className="welement">Temperature: {C.toFixed(2)} &#8451;</div>
          <div className="welement">Humidity: {weather.humidity} %</div>
          <div className="welement">Pressure: {weather.press} mb</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="weathhead">Weather Info</div>
      <br /><br /><br />
      <div className="mainweather">
        <div className="weather">
          <button onClick={() => handleOptionChange("option1")} className="b1">
            CityName
          </button>
          <button onClick={() => handleOptionChange("option2")} className="b1">
            ZipCode
          </button>
          <br /><br />
          {option === "option1" && (
            <form onSubmit={apiCall1} className="form">
              <input type="text" placeholder="City" name="loc" />
              <button className="bttn">Search</button>
            </form>
          )}

          {option === "option2" && (
            <form onSubmit={apiCall2} className="form">
              <input type="number" placeholder="ZIP Code" name="loc" />
              <button className="bttn">Search</button>
            </form>
          )}
          <br /><br />
          {weather && <WeatherInfo />}
        </div>
      </div>
    </>
  );
}

export default App;
