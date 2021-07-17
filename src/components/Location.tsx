import useLocation from "hooks/useLocation";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Location() {
  const [location, setLocation] = useState<{ country: string; city: string }>();
  const { pos, err } = useLocation();
  useEffect(() => {
    if (pos) {
      fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.5e2ccb3c5d3ef5f43fcdfc8cb1be781e&lat=${pos.lat}&lon=${pos.lon}&format=json`
      )
        .then((res) => res.json())
        .then(({ address }) =>
          setLocation({ country: address.country, city: address.city })
        )
        .catch(() => setLocation({ country: "Unknown", city: "Unknown" }));
    }
  }, [pos]);
  if (err) return <div className="location">{err}</div>;
  return (
    <div className="location">
      <div className="country">{location?.country}</div>
      <div className="city">{location?.city}</div>
    </div>
  );
}
