import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import Select from "../Select/Select";
import System from "../System/System";
import LangContext from "../../contexts/LangContext/Lang";
import Toggle from "../Toggle/Toggle";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import ImgLoader from "../ImgLoader/ImgLoader";
import "./WeatherApi.scss";

const axiosClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast",
});

interface WeatherApiResponse {
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

const WeatherApi: React.FC<{
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}> = ({ lang, setLang, darkMode, setDarkMode }) => {
  const [system, setSystem] = useState<string>("metric");
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, error, refetch } = useQuery<
    AxiosResponse<WeatherApiResponse>,
    Error
  >(["forecast", search], () => fetchData(search), {
    enabled: false,
  });

  function fetchData(
    search: string,
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    const apiKey = import.meta.env.VITE_API_KEY;
    const units = system;
    const queryParams = {
      q: search,
      units: units,
      lang: lang,
      appid: apiKey,
    };
    console.log("Query Params:", queryParams);
    return axiosClient.get("", { params: queryParams });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <ThemeContext.Provider value={darkMode}>
      <LangContext.Provider value={lang}>
        <div className="base">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleChange}
              className="search"
            />
            <button type="submit" className="submit">
              <ImgLoader
                src="internal/search-icon.svg"
                alt="icon"
                height="1rem"
                width="1rem"
                filter="var(--search-filter)"
              />
            </button>
            <System system={system} setSystem={setSystem} lang={lang} />
            <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <Select lang={lang} setLang={setLang} refetch={refetch} />
            {isLoading && <div>{lang === "en" ? "Loading" : "Ładowanie"}</div>}
            {isError && (
              <div>
                {lang === "en" ? "Error:" : "Błąd:"}
                {lang === "en"
                  ? error?.message
                  : "Żądanie nie powiodło się z kodem stanu 404"}
              </div>
            )}
          </form>
          <div className="data">
            {data && (
              <WeatherDisplay data={data.data} system={system} lang={lang} />
            )}
          </div>
        </div>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
};

export default WeatherApi;
