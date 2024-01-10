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
  const [system, setSystem] = useState<string>("metric");
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isError, error, refetch } = useQuery<
    AxiosResponse<WeatherApiResponse>,
    Error
  >(["weather", search], () => fetchData(search), {
    enabled: false,
  });

  function fetchData(search: string): Promise<AxiosResponse<WeatherApiResponse>> {

    const apiKey = import.meta.env.VITE_API_KEY;
    const units = system; // dodać tu możliwość zmiany jednostek
    const queryParams = {
      q: search,
      units: units,
      appid: apiKey,
      lang: "pl",
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

  return (
    <div className="base">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." onChange={handleChange} />
        <button type="submit">Search</button>
        <button onClick={() => system === "metric" ? setSystem("imperial") : setSystem("metric")}> click to change: {system} </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error?.message}</div>}
      {data && <WeatherDisplay data={data.data} />}
    </div>
  );
};

export default WeatherApi;
