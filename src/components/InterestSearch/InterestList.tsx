
import React from "react";
import { Interest } from "../../services/api";
import InterestItem from "./InterestItem";
import { Skeleton } from "@/components/ui/skeleton";

interface InterestListProps {
  interests: Interest[];
  onSelectInterest: (interest: Interest) => void;
  isLoading?: boolean;
}

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center p-4 border-l-4 border-gray-700">
        <Skeleton className="w-8 h-8 rounded-full mr-3 bg-gray-700" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3 bg-gray-700" />
          <Skeleton className="h-4 w-1/2 bg-gray-700" />
        </div>
      </div>
    ))}
  </div>
);

const InterestList: React.FC<InterestListProps> = ({ interests, onSelectInterest, isLoading }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="mt-2 bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden max-h-[70vh] overflow-y-auto border border-white/10">
      <div className="flex flex-col">
        {interests.map((interest) => (
          <InterestItem
            key={interest.id}
            name={interest.name}
            color={interest.color}
            avatar={interest.avatar}
            onClick={() => onSelectInterest(interest)}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestList;
