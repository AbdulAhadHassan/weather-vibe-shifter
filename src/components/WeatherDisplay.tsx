
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface WeatherDisplayProps {
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    city: string;
  };
}

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  const getSuggestion = (temp: number, condition: string) => {
    if (condition.toLowerCase() === "clear" && temp > 20) {
      return {
        activity: "Visit a local park or garden",
        description: "Perfect weather for outdoor activities and nature exploration."
      };
    } else if (condition.toLowerCase() === "rain") {
      return {
        activity: "Explore indoor attractions",
        description: "Great time to visit museums, galleries, or cozy cafes."
      };
    } else if (condition.toLowerCase() === "snow") {
      return {
        activity: "Winter activities",
        description: "Ideal for winter sports or enjoying the snowy scenery."
      };
    } else if (temp < 10) {
      return {
        activity: "Indoor entertainment",
        description: "Visit local theaters, shopping centers, or restaurants."
      };
    } else {
      return {
        activity: "City exploration",
        description: "Perfect weather for sightseeing and walking tours."
      };
    }
  };

  const suggestion = getSuggestion(weather.temp, weather.condition);

  return (
    <div className="animate-fade-in">
      <div className="glass p-10 max-w-md mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-light tracking-wide">{weather.city}</h2>
          <p className="text-7xl font-extralight tracking-tight">{Math.round(weather.temp)}°C</p>
          <p className="text-2xl font-light capitalize text-gray-700">{weather.condition}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/30">
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium mb-1">Humidity</p>
            <p className="text-2xl font-light">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium mb-1">Wind Speed</p>
            <p className="text-2xl font-light">{weather.windSpeed} km/h</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/30">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-700">Today's Suggestion</h3>
            </div>
            <p className="text-xl font-light text-gray-800">{suggestion.activity}</p>
            <p className="text-sm text-gray-600">{suggestion.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
