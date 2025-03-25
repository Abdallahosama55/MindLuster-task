import React from "react";

import { ArrowRight } from "lucide-react";
import Card from "./card";

// Define the types for the props


interface ItemsColumnProps {
  columnTitle: string;
  items: any;
  columnId: any;
}

const ItemsColumn: React.FC<ItemsColumnProps> = ({ columnTitle, items, columnId }) => {
  // Define colors based on columnId
  const getArrowColor = (): string => {
    switch (columnId) {
      case 1:
        return "#6161FF";
      case 2:
        return "#FB5607";
      case 3:
        return "#52CD8F";
      default:
        return "#000000"; 
    }
  };
  return (
    <div
      className=" bg-card rounded-xl scrollbar-thin shadow-xl scrollbar-thumb-blue-700 
    scrollbar-track-blue-300 
      p-4 mb-3 px-0 "
    >
      <p className="flex gap-2 items-center py-1 px-2 text-lg font-semibold rounded-md">
        <ArrowRight color={getArrowColor()} />
        {columnTitle}
      </p>
      <div
        className="pt-4 flex flex-col gap-y-3 overflow-y-auto h-[70vh] px-3"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 ##1E1E1EBF' }}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Card
              key={index}
              draggableId={item.id.toString()}
              index={index}
              id={item.id}
              title={item.title}
              precentage={item.precentage}
              description={item.description}
              priority={item.priority}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemsColumn;