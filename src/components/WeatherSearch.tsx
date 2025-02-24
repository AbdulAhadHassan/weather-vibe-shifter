
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const WeatherSearch = ({ onSearch, isLoading }: WeatherSearchProps) => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
    </form>
  );
};

export default WeatherSearch;
