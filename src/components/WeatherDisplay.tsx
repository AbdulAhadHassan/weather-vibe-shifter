import { MapPin, AlertTriangle } from "lucide-react";

interface WeatherDisplayProps {
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    city: string;
    precipitation?: number;
    isSevereWeather?: boolean;
  };
  textColor: string;
}

const WeatherDisplay = ({ weather, textColor }: WeatherDisplayProps) => {
  return (
    <div className="animate-fade-in">
      <div
        className="blur-glass"
        style={{ color: textColor }} // Apply dynamic text 
        
      >
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-light tracking-wide">{weather.city}</h2>
          <p className="text-7xl font-extralight tracking-tight">{Math.round(weather.temp)}°C</p>
          <p className="text-2xl font-light capitalize">{weather.condition}</p>
        </div>

         {/* Show Warnings if Severe Weather */}
        {weather.isSevereWeather && (
          <div className="bg-red-500 text-white p-4 rounded-md flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            <span>⚠️ Severe Weather Alert: Stay Safe! ⚠️</span>
          </div>
        )}

        {/* Show Rain or Snow Alerts */}
        {weather.precipitation > 0 && (
          <div className="bg-yellow-500 text-black p-4 rounded-md text-center">
            {weather.precipitation > 5
              ? `⚠️ Heavy ${weather.condition === "Snow" ? "snowfall" : "rain"} expected!`
              : `🌧️ Light ${weather.condition === "Snow" ? "snow" : "rain"} detected (${weather.precipitation} mm).`}
          </div>
        )}

        {/* Humidity & Wind Speed Labels */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/30">
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Humidity</p>
            <p className="text-2xl font-light">{weather.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Wind Speed</p>
            <p className="text-2xl font-light">{weather.windSpeed} km/h</p>
          </div>
        </div>

        {/* Suggestion Section */}
        <div className="pt-6 border-t border-white/30">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: textColor }} />
              <h3 className="text-lg font-medium">Today's Suggestion</h3>
            </div>
            <p className="text-xl font-light">
              {weather.condition === "Rain"
                ? "Bring an umbrella ☔"
                : weather.condition === "Snow"
                ? "Wear warm clothes ❄️"
                : "Enjoy the weather!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
