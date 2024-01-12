import React from "react";

interface WeatherData {
  list: { // it isn't dynamic yet, add a loop to display all the data [or at least 3 days]
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: {
        description: string;
        icon: string;
      }[];
  }[];
  city: {
    name: string;
  };
}

interface WeatherDisplayProps {
  data: WeatherData;
  system: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, system }) => {
  const [city, temp, description, icon] = [
    data.city.name,
    data.list[0].main.temp,
    data.list[0].weather[0].description,
    data.list[0].weather[0].icon,
  ];

  return (
    <div>
      <div>{city}</div>
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
