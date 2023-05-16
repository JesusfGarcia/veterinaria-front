import React from "react";
export default function DaySelect({ value, handleDay }) {
  const [days, setDays] = React.useState([]);

  React.useEffect(() => {
    const newArray = [];
    for (let i = 1; i < 32; i++) {
      newArray.push(i);
    }
    setDays([...newArray]);
  }, []);
  return (
    <select
      style={{
        border: "0px",
        borderRadius: "8px",
      }}
      value={value}
      onChange={handleDay}
    >
      <option value="">día</option>
      {days.map((day) => (
        <option value={day}>{day}</option>
      ))}
    </select>
  );
}
