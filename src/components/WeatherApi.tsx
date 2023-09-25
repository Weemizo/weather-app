import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import WeatherDisplay from './WeatherDisplay';

const axiosClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

interface WeatherApiResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

function fetchData(search: string): Promise<AxiosResponse<WeatherApiResponse>> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const units = 'metric';
  const queryParams = {
    q: search,
    units: units,
    appid: apiKey,
  };

  return axiosClient.get('', { params: queryParams });
}

const WeatherApi: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const { data, isLoading, isError, error } = useQuery<AxiosResponse<WeatherApiResponse>, Error>(
    ['weather', search],
    () => fetchData(search)
  );

  const searchButton = () => {
    fetchData(search);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchButton}>Search</button>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error?.message}</div>}
      {data && <WeatherDisplay data={data.data} />}
    </div>
  );
}

export default WeatherApi;
