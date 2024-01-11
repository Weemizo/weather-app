import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherApi.scss";

const axiosClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

interface WeatherApiResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherApi: React.FC = () => {
  const [lang, setLang] = useState<string>("en");
  const [system, setSystem] = useState<string>("metric");
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, error, refetch } = useQuery<
    AxiosResponse<WeatherApiResponse>,
    Error
  >(["weather", search], () => fetchData(search), {
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

    return axiosClient.get("", { params: queryParams });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleLang = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLang(event.target.value);
    refetch();
  };

  return (
    <div className="base">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." onChange={handleChange} />
        <button type="submit"> {lang === "en" ? "Search" : "Szukaj"} </button>
        <button
          onClick={() =>
            system === "metric" ? setSystem("imperial") : setSystem("metric")
          }
        >
          {lang === "en"
            ? `click to change: ${system}`
            : system === "metric"
              ? `naciśnij aby zmienić: metryczny`
              : `naciśnij aby zmienić: imperialny`}
        </button>
        <select onChange={handleLang}>
          <option>
            {lang === "en" ? "Choose the language:" : "Wybierz język"}
          </option>
          <option value="en">{lang === "en" ? "English" : "Angielski"}</option>
          <option value="pl">{lang === "en" ? "Polish" : "Polski"}</option>
        </select>
        {isLoading && <div>{lang === "en" ? "Loading" : "Ładowanie"}</div>}
        {isError && (
          <div>
            {lang === "en" ? "Error:" : "Błąd:"}
            {lang === "en"
              ? error?.message
              : "Żądanie nie powiodło się z kodem stanu 404"}
          </div>
        )}
        {data && <WeatherDisplay data={data.data} system={system} />}
      </form>
    </div>
  );
};

export default WeatherApi;
