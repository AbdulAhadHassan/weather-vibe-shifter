
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
      </div>
    </div>
  );
};

export default WeatherDisplay;
