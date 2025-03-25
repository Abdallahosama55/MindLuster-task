import React, { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

interface StrictModeDroppableProps extends DroppableProps {
  children: any;
}

const StrictModeDroppable: React.FC<StrictModeDroppableProps> = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;