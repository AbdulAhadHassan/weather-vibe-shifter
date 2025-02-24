
import { useState } from "react";
import WeatherSearch from "@/components/WeatherSearch";
import WeatherDisplay from "@/components/WeatherDisplay";
import { useToast } from "@/components/ui/use-toast";

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  city: string;
}

const WEATHER_API_KEY = "YOUR_API_KEY";
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
          ? "linear-gradient(to bottom right, #E3F2FD, #90CAF9)"
          : "linear-gradient(to bottom right, #1A237E, #283593)";
      case "clouds":
        return "linear-gradient(to bottom right, #ECEFF1, #B0BEC5)";
      case "rain":
      case "drizzle":
        return "linear-gradient(to bottom right, #546E7A, #78909C)";
      case "thunderstorm":
        return "linear-gradient(to bottom right, #263238, #37474F)";
      case "snow":
        return "linear-gradient(to bottom right, #E0E0E0, #FAFAFA)";
      case "mist":
      case "fog":
        return "linear-gradient(to bottom right, #CFD8DC, #B0BEC5)";
      default:
        return "linear-gradient(to bottom right, #F1F0FB, #E5DEFF)";
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
          Weather Forecast
        </h1>
        <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        {isLoading ? (
          <div className="glass p-10 animate-pulse space-y-4">
            <div className="h-8 w-32 bg-white/20 rounded-full mx-auto"></div>
            <div className="h-16 w-24 bg-white/20 rounded-full mx-auto"></div>
            <div className="h-6 w-40 bg-white/20 rounded-full mx-auto"></div>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="space-y-2">
                <div className="h-4 w-16 bg-white/20 rounded-full mx-auto"></div>
                <div className="h-6 w-12 bg-white/20 rounded-full mx-auto"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-white/20 rounded-full mx-auto"></div>
                <div className="h-6 w-12 bg-white/20 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        ) : (
          weather && <WeatherDisplay weather={weather} />
        )}
      </div>
    </div>
  );
};

export default Index;
