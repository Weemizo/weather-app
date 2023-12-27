import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.scss";
import WeatherApi from "./components/WeatherApi";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <body>
        <div className="navbar">Weather App</div>

        <div className="contents">
          <WeatherApi />
        </div>
      </body>
    </QueryClientProvider>
  );
}
