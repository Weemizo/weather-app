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
