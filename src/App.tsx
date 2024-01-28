import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import WeatherApi from "./components/WeatherApi/WeatherApi";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const [lang, setLang] = useState<string>("en");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="navbar">{lang==="en" ? "Weather App" : "Aplikacja Pogodowa"}</div>
        <WeatherApi lang={lang} setLang={setLang}/>
      </div>
    </QueryClientProvider>
  );
}
