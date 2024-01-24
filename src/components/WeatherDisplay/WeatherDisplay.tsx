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
      main: string;
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
        .map(({ dt, dt_txt, main, weather }) => {

          const day = new Date(dt_txt).getDay();
          const days: { [key: string]: string[] } = {
            en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            pl: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek","Sobota"],
          };

          const dayLabel = days[lang]?.[day] || "";
          
          const dayOrNight = () => {
            return weather[0].icon.slice(-1) === "d" ? "day" : "night";
          }

            const weatherImages: { [key: string]: string} = { 
              Thunderstorm: `src/assets/svg/wi-${dayOrNight()}-thunderstorm.svg`,
              Rain: `src/assets/svg/wi-${dayOrNight()}-rain.svg`, 
              Snow: `src/assets/svg/wi-${dayOrNight()}-snow.svg`,
              Mist: `src/assets/svg/wi-${dayOrNight()}-sprinkle.svg`,
              Smoke: "src/assets/svg/wi-smoke.svg",
              Dust: "src/assets/svg/wi-dust.svg",
              Haze: `src/assets/svg/wi-${dayOrNight()}-fog.svg`,
              Fog: `src/assets/svg/wi-${dayOrNight()}-fog.svg`,
              Sand: "src/assets/svg/wi-sandstorm.svg",
              Ash: "src/assets/svg/wi-volcano.svg",
              Squall: `src/assets/svg/wi-strong-wind.svg`,
              Tornado: `src/assets/svg/wi-${dayOrNight()}-tornado.svg`,
              Clear: `src/assets/svg/wi-${dayOrNight()}-clear.svg`,
              Clouds: `src/assets/svg/wi-${dayOrNight()}-cloudy.svg`,
            };

            const weatherIcon = weatherImages[weather[0].main];

          return (
            <div key={dt}>
              <div className="weather-date">
                {`${dayLabel} ${dt_txt.split(" ")[0].split("-")[2]}-${dt_txt.split(" ")[0].split("-")[1]}`}
              </div>
              <div className="weather-data">
                {main.temp}
                {system === "metric" ? "°C" : "°F"} {weather[0].description}
                <img
                  src={weatherIcon}
                  alt={weather[0].description}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WeatherDisplay;
