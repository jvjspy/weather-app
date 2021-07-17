import moment, { Moment } from "moment";
import React, { ReactElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { IoMdTime } from "react-icons/io";

interface Time {
  hour: number;
  minute: number;
  period: "AM" | "PM";
}
const periods: Time["period"][] = ["AM", "PM"];

interface Props {
  initialValue?: number;
  onChange: (value: number) => void;
}
function toTime(value: number): Time {
  const time = moment.unix(value);
  let hour = time.hour();
  const minute = time.minute();
  const period = hour < 12 ? "AM" : "PM";
  if (hour < 12) hour = hour == 0 ? 12 : hour;
  else hour = hour == 12 ? 12 : hour - 12;
  return {
    hour,
    minute,
    period,
  };
}
function toMoment(time: Time): Moment {
  return moment(`${time.hour}:${time.minute} ${time.period}`, "hh:mm A");
}
export default function TimePicker({
  initialValue,
  onChange,
}: Props): ReactElement {
  const [time, setTime] = useState<Time>();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (initialValue) {
      setTime(toTime(initialValue));
    }
  }, [initialValue]);
  function toggle() {
    setShow(!show);
  }
  function handleSelect(name: keyof Time, val: Time[typeof name]) {
    const newTime = {
      ...(time || { hour: 12, minute: 0, period: "AM" }),
      [name]: val,
    };
    setTime(newTime);
    onChange(toMoment(newTime).unix());
  }
  return (
    <div className={`time-picker${show ? " active" : ""}`}>
      <div className="time-picker-label">
        {time ? toMoment(time).format("hh:mm A") : "--:-- --"}
        <button type="button" className="btn-icon" onClick={toggle}>
          <IoMdTime />
        </button>
      </div>
      <div className="time-picker-panel">
        <div className="time-picker-options">
          <ul>
            {[...Array(12)].map((_, i) => (
              <li
                className={time && time.hour == i + 1 ? "active" : undefined}
                onClick={() => handleSelect("hour", i + 1)}
                key={i}
              >
                {(i + 1).toString().padStart(2, "0")}
              </li>
            ))}
          </ul>
          <ul>
            {[...Array(60)].map((_, i) => (
              <li
                className={time && time.minute == i ? "active" : undefined}
                onClick={() => handleSelect("minute", i)}
                key={i}
              >
                {i.toString().padStart(2, "0")}
              </li>
            ))}
          </ul>
          <ul>
            {periods.map((a) => (
              <li
                className={time && time.period == a ? "active" : undefined}
                onClick={() => handleSelect("period", a)}
                key={a}
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="time-picker-action">
          <Button onClick={toggle} size="sm" color="primary">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
