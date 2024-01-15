import "./WeatherDisplay.scss";

interface WeatherData {
  list: {
    dt: number;
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
  lang: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  data,
  system,
  lang,
}) => {
  const [city] = data.city.name.split(",");

  return (
    <div className="weather">
      <h1>{city}</h1>
      {data.list
        .filter((_, index) => index % 8 === 0)
        .map(({ dt, dt_txt, main, weather }, index) => {
          const dayLabels: { [key: string]: string[] } = {
            en: ["Today", "Tomorrow", "Day after tomorrow"],
            pl: ["Dzisiaj", "Jutro", "Pojutrze"],
          };

          const dayLabel = dayLabels[lang]?.[index] || "";

          return (
            <div key={dt}>
              <div className="weather-date">
                {`${dayLabel} ${dt_txt.split(" ")[0]}`}
              </div>
              <div className="weather-data">
                {main.temp}
                {system === "metric" ? "°C" : "°F"} {weather[0].description}
                <img
                  src={`https://openweathermap.org/img/wn/${weather[0].icon.toString()}.png`}
                  alt={weather[0].icon}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WeatherDisplay;
