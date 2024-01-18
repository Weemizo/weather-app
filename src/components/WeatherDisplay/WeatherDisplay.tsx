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

          const backgroundImages = () => {
            const images = {
              mist: "src/assets/images/mist.png",
              rainy: "src/assets/images/rainy.png",
              clear: "src/assets/images/clear.png",
              cloudy: "src/assets/images/cloudy.png",
              snow: "src/assets/images/snow.png",
              thunderstorm: "src/assets/images/thunderstorm.png",
            };
        
            if (weather[0].main === "Mist") {
              return images.mist;
            }
            else if (weather[0].main === "Rain" || weather[0].main === "Drizzle") {
              return images.rainy;
            }
            else if (weather[0].main === "Clear") {
              return images.clear;
            }
            else if (weather[0].main === "Clouds") {
              return images.cloudy;
            }
            else if (weather[0].main === "Snow") {
              return images.snow;
            }
            else if (weather[0].main === "Thunderstorm") {
              return images.thunderstorm;
            }
          }

          return (
            <div key={dt}>
              <div className="weather-date">
                {`${dayLabel} ${dt_txt.split(" ")[0].split("-")[2]}-${dt_txt.split(" ")[0].split("-")[1]}`}
              </div>
              <div className="weather-data">
                {main.temp}
                {system === "metric" ? "°C" : "°F"} {weather[0].description}
                <img
                  src={backgroundImages()}
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
