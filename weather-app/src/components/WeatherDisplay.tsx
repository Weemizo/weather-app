import React from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div>
      <div>{data.name}</div>
      <div>{data.main.temp}°C</div>
      <div>{data.weather[0].description}</div>
    </div>
  );
}

export default WeatherDisplay;
