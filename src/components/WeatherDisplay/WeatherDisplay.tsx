import "./WeatherDisplay.scss";
import ImgLoader from "../ImgLoader/ImgLoader";
import days from "../../utils/Days/Days";

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
      <div className="weather-data-container">
        {data.list
          .filter((_, index) => index % 8 === 0)
          .map(({ dt, dt_txt, main, weather }) => {
            const day = new Date(dt_txt).getDay();
            const dayLabel = days[lang]?.[day] || "";

            const dayOrNight = () => {
              return weather[0].icon.slice(-1) === "d" ? "day" : "night";
            };

            const weatherImages: { [key: string]: string } = {
              Thunderstorm: `internal/wi-${dayOrNight()}-thunderstorm.svg`,
              Rain: `internal/wi-${dayOrNight()}-rain.svg`,
              Snow: `internal/wi-${dayOrNight()}-snow.svg`,
              Mist: `internal/wi-${dayOrNight()}-sprinkle.svg`,
              Smoke: "internal/wi-smoke.svg",
              Dust: "internal/wi-dust.svg",
              Haze: `internal/wi-${dayOrNight()}-fog.svg`,
              Fog: `internal/wi-${dayOrNight()}-fog.svg`,
              Sand: "internal/wi-sandstorm.svg",
              Ash: "internal/wi-volcano.svg",
              Squall: `internal/wi-strong-wind.svg`,
              Tornado: `internal/wi-${dayOrNight()}-tornado.svg`,
              Clear: `internal/wi-${dayOrNight()}-clear.svg`,
              Clouds: `internal/wi-${dayOrNight()}-cloudy.svg`,
            };

            const weatherIcon = weatherImages[weather[0].main];

            return (
              <div key={dt} className="weather-div">
                <div className="weather-date">
                  {`${dayLabel} ${dt_txt.split(" ")[0].split("-")[2]}-${dt_txt.split(" ")[0].split("-")[1]}`}
                </div>
                <div className="weather-data">
                  {main.temp}
                  {system === "metric" ? "°C" : "°F"}
                  <br></br>
                  {weather[0].description}
                  <ImgLoader src={weatherIcon} alt={weather[0].description} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WeatherDisplay;
