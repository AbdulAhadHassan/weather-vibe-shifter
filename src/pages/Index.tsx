
import { useState } from "react";
import WeatherSearch from "@/components/WeatherSearch";
import WeatherDisplay from "@/components/WeatherDisplay";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  city: string;
}

const WEATHER_API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState("");
  const { toast } = useToast();

  const getWeatherBackground = (condition: string) => {
    const timeOfDay = new Date().getHours() > 6 && new Date().getHours() < 18 ? "day" : "night";
    
    switch (condition.toLowerCase()) {
      case "clear":
        return timeOfDay === "day" 
          ? "url('/photo-1501854140801-50d01698950b')"
          : "url('/photo-1470813740244-df37b8c1edcb')";
      case "clouds":
        return "url('/photo-1470071459604-3b5ec3a7fe05')";
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return "url('/photo-1500375592092-40eb2168fd21')";
      default:
        return "url('/photo-1501854140801-50d01698950b')";
    }
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      const weatherData: WeatherData = {
        temp: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
      };

      setWeather(weatherData);
      setBackground(getWeatherBackground(data.weather[0].main));
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch weather data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {background && (
        <div
          className="weather-background animate-fade-in"
          style={{ backgroundImage: background }}
        />
      )}
      <div className="w-full max-w-md space-y-8 z-10">
        <h1 className="text-4xl font-light text-center mb-8 animate-slide-in">
          Weather App
        </h1>
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        {weather && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  );
};

export default Index;
