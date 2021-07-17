import moment from "moment";
import React, { useEffect, useState } from "react";

export default function DateTime() {
  const [now, setNow] = useState(moment());
  useEffect(() => {
    const id = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="date-time">
      <div className="time">
        <strong>{now.format("hh:mm")}</strong>
        <span>{now.format("A")}</span>
      </div>
      <div className="date">{now.format("dddd, D MMMM YYYY")}</div>
    </div>
  );
}
