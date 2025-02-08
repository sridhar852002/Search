import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { searchInterests, Interest } from "../../services/api";
import SearchInput from "./SearchInput";
import InterestList from "./InterestList";
import { toast } from "sonner";

const InterestSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [cachedInterests, setCachedInterests] = useState<Interest[]>([]);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setDebouncedTerm(term);
    }, 300),
    []
  );

  const { data, isLoading } = useQuery({
    queryKey: ["interests", debouncedTerm],
    queryFn: () => searchInterests(debouncedTerm),
    enabled: true,
  });

  useEffect(() => {
    if (data?.autocomplete) {
      setCachedInterests(data.autocomplete);
    }
  }, [data]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);

    // Filter cached results immediately while waiting for API response
    if (cachedInterests.length > 0) {
      const filteredInterests = cachedInterests.filter((interest) =>
        interest.name.toLowerCase().includes(value.toLowerCase())
      );
      setCachedInterests(filteredInterests);
    }
  };

  const handleSelectInterest = (interest: Interest) => {
    toast.success(`Selected: ${interest.name.split("[")[0].trim()}`);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SearchInput value={searchTerm} onChange={handleSearch} />
      {(isLoading || cachedInterests.length > 0) && (
        <InterestList
          interests={cachedInterests}
          onSelectInterest={handleSelectInterest}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default InterestSearch;