import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  onFocus,
  placeholder = "Search interests..." 
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="w-full h-14 pl-14 pr-4 text-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-white placeholder-gray-400"
          placeholder={placeholder}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
      </div>
    </div>
  );
};

export default SearchInput;