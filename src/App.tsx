import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherApi from "./components/WeatherApi/WeatherApi";
import "./App.scss";

const queryClient = new QueryClient();

export default function App() {
  const [lang, setLang] = useState<string>("en");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app" data-theme={darkMode ? "dark" : "light"}>
        <div className="navbar">
          {lang === "en" ? "Weather App" : "Aplikacja Pogodowa"}
        </div>
        <WeatherApi lang={lang} setLang={setLang} darkMode={darkMode} setDarkMode={setDarkMode}/>
      </div>
    </QueryClientProvider>
  );
}
