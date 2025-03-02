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
  timezone: number;
  precipitation?: number; 
  isSevereWeather?: boolean;
}

const WEATHER_API_KEY = "c78f53e98d94db40b5acb72c96a8dac8";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?";

const getWeatherBackground = (condition: string, isNight: boolean) => {
  const backgrounds: { [key: string]: { image: string; textColor: string } } = {
    clear: {
      image: isNight ? "/night.jpg" : "/sky.jpg",
      textColor: isNight ? "white" : "black",
    },
    clouds: {
      image: isNight ? "/cloudy-night.jpg" : "/cloudy.jpg",
      textColor: isNight ? "white" : "black",
    },
    rain: {
      image: isNight ? "/rain-night.jpg" : "/rain.jpg",
      textColor: isNight ? "white" : "black",
    },
    drizzle: {
      image: isNight ? "/mist-night.jpg" : "/drizzle.jpg",
      textColor: isNight ? "white" : "black",
    },
    thunderstorm: {
      image: isNight ? "/thunder.jpg" : "/thunder-day.jpg",
      textColor: isNight ? "white" : "black",
    },
    snow: {
      image: isNight ? "/snow-night.jpg" : "/snow.jpg",
      textColor: isNight ? "white" : "black",
    },
    mist: {
      image: isNight ? "/mist-night.jpg" : "/mist.jpg",
      textColor: isNight ? "white" : "black",
    },
    fog: {
      image: isNight ? "/mist-night.jpg" : "/fog.jpg",
      textColor: isNight ? "white" : "black",
    },
    default: {
      image: isNight ? "/night.jpg" : "/sky.jpg",
      textColor: isNight ? "white" : "black",
    },
  };

  return backgrounds[condition.toLowerCase()] || backgrounds["default"];
};


const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState("");
  const [textColor, setTextColor] = useState("black");
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${WEATHER_API_URL}q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      
      // Convert city's time to check if it's night
      const currentUTC = Math.floor(Date.now() / 1000); // Get current UTC timestamp
      const localTime = currentUTC + data.timezone; // Convert to city's local time
      const hours = new Date(localTime * 1000).getUTCHours();
      const isNight = hours < 6 || hours >= 18; // Night if before 6 AM or after 6 PM

      // **Check Rain or Snow Data (in mm)**
      const rainVolume = data.rain ? data.rain["1h"] || 0 : 0; // Rain in last hour
      const snowVolume = data.snow ? data.snow["1h"] || 0 : 0; // Snow in last hour
      const precipitation = rainVolume + snowVolume; // Total precipitation in mm
      const isSevereWeather =
        data.weather[0].main === "Thunderstorm" ||
        data.weather[0].main === "Extreme" ||
        data.wind.speed > 40; // Check for storms or strong winds

      const weatherData: WeatherData = {
        temp: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        city: data.name,
        timezone: data.timezone, // Save timezone offset for reference
        precipitation, // ✅ Now it's recognized by TypeScript
        isSevereWeather, // ✅ Now it's recognized by TypeScript
      };

      setWeather(weatherData);

      const { image, textColor } = getWeatherBackground(data.weather[0].main, isNight);
      setBackground(image);
      setTextColor(textColor);
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
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: textColor, // Apply dynamic text color
        transition: "background 0.5s ease-in-out, color 0.5s ease-in-out",
      }}
    >
      <div className="w-full max-w-md space-y-8 z-10">
        <h1 className="text-4xl font-light text-center mb-8 animate-slide-in">
          Weather Forecast
        </h1>
  
        {/* ✅ Keep Search Bar Text Black */}
        <div className="text-black">
          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>
  
        {isLoading ? <p>Loading...</p> : weather && <WeatherDisplay weather={weather} textColor={textColor} />}
      </div>
    </div>
  );  
};

export default Index;
