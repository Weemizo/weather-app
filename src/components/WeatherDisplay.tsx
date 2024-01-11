import React from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface WeatherDisplayProps {
  data: WeatherData;
  system: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, system }) => {
  const [name, temp, description, icon] = [
    data.name,
    data.main.temp,
    data.weather[0].description,
    data.weather[0].icon,
  ];

  return (
    <div>
      <div>{name}</div>
      <div>
        {temp}
        {system === "metric" ? "°C" : "°F"}
      </div>
      <div>{description}</div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${icon.toString()}@2x.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;
