import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const WEATHER_API_KEY = "c78f53e98d94db40b5acb72c96a8dac8";

const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchCitySuggestions = async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]); // Clear suggestions if input is too short
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const cityNames = data.map((city) => `${city.name}, ${city.country}`);
        setSuggestions(cityNames);
      } else {
        setSuggestions([]); // No results found, clear suggestions
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions([]); //  Ensure no broken suggestions
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchCitySuggestions(e.target.value);
  };

  const handleSelectCity = (city: string) => {
    setQuery(city);
    setSuggestions([]); // Hide suggestions after selection
    onSearch(city);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({ title: "Please enter a city name", variant: "destructive" });
      return;
    }
    onSearch(query.trim());
    setSuggestions([]); // Hide suggestions when pressing Enter
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative flex flex-col">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={query}
            onChange={handleInputChange}
            className="pr-12 h-12 glass text-lg placeholder:text-gray-400"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-2 glass"
            disabled={isLoading}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Show suggestions only if available */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-2 z-50">
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default WeatherSearch;
