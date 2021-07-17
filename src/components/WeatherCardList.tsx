import React, { useEffect, useState } from "react";
import WeatherCardItem from "./WeatherCardItem";
import useLocation from "hooks/useLocation";
export interface Weather {
  time: number;
  icon: string;
  temp: number;
}
export default function WeatherCardList() {
  const { pos, err: geoErr } = useLocation();
  const [data, setData] = useState<Weather[]>();
  const [err, setErr] = useState<string>();
  useEffect(() => {
    if (pos) {
      window
        .fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.lat}&lon=${pos.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=587a5ed360eff2bfdb85b9cbd59932e4`
        )
        .then((res) => res.json())
        .then((data) => {
          setData(
            data.daily.map((d: any) => ({
              time: d.dt,
              icon: d.weather[0].icon,
              temp: d.temp.day,
            }))
          );
        })
        .catch(() => {
          setErr("Can not fetch weather data!");
        });
    }
  }, [pos]);
  if (err || geoErr) return <div className="info-text">{err || geoErr}</div>;
  if (!data) return <div className="info-text">Loading...</div>;
  return (
    <ul className="weather-card-list">
      {data.map((w) => (
        <WeatherCardItem weather={w} key={w.time} />
      ))}
    </ul>
  );
}
