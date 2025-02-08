import React from "react";

interface InterestItemProps {
  name: string;
  color: string;
  avatar?: string | null;
  onClick?: () => void;
}

const InterestItem: React.FC<InterestItemProps> = ({ name, color, avatar, onClick }) => {
  // Split name into primary and secondary terms
  const [primaryTerm, ...secondaryTerms] = name.split(/\[(.*?)\]/).filter(Boolean);
  const firstLetter = primaryTerm.trim().charAt(0).toUpperCase();

  return (
    <div
      onClick={onClick}
      className="group flex items-center p-4 hover:bg-gray-800/50 cursor-pointer animate-slide-up border-l-4 transition-all duration-200"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center gap-3 w-full">
        {avatar ? (
          <img src={avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: color }}
          >
            {firstLetter}
          </div>
        )}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-medium text-white group-hover:text-gray-200">
            {primaryTerm.trim()}
          </h3>
          {secondaryTerms.length > 0 && (
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              {secondaryTerms.join(", ").trim()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestItem;