import moment from "moment";
import React from "react";
import { Weather } from "./WeatherCardList";
interface Props {
  weather: Weather;
}
export default function WeatherCardItem({ weather }: Props) {
  return (
    <li className="weather-card-item">
      <div className="badge rounded-pill bg-primary">
        {moment.unix(weather.time).format("ddd")}
      </div>
      <div className="weather-card-icon">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="icon"
        />
      </div>
      <div className="temprature">
        {weather.temp} <sup>o</sup>
      </div>
    </li>
  );
}
