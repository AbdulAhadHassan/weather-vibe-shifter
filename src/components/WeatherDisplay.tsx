
import { cn } from "@/lib/utils";

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
  return (
    <div className="animate-fade-in">
      <div className="glass p-8 max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-light">{weather.city}</h2>
          <p className="text-6xl font-extralight">{Math.round(weather.temp)}°C</p>
          <p className="text-xl capitalize">{weather.condition}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="text-xl">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Wind Speed</p>
            <p className="text-xl">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
