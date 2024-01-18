import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import WeatherApi from "./components/WeatherApi/WeatherApi";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app" >
        <div className="navbar">Weather App</div>
        <div className="contents">
          <WeatherApi />
        </div>
      </div>
    </QueryClientProvider>
  );
}
