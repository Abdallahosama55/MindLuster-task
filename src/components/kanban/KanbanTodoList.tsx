// KanbanTodoList.tsx
import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ItemsColumn from "./itemsColumn";
import StrictModeDroppable from "./droppable";
import { reorder } from "./helpers";
import toast, { Toaster } from "react-hot-toast";
import { JSX } from "react/jsx-runtime";
import { useGetTodosQuery } from "@/services/tasksApi";
import { TodoDialog } from "@/components/ui/app-dialogTodo";
import { useTasks } from "@/hooks/use-tasks";

interface Item {
  id: string;
  title: string;
  completed?: boolean;
}

interface Column {
  id: string | number;
  title: string;
  items: Item[];
}

interface ColumnData {
  [key: string]: Column;
}

const KanbanTodoList: React.FC = () => {
  const { data: initialData, isLoading, isError } = useGetTodosQuery(undefined);
  const persistedTasks = useTasks();
  const [columnData, setColumnData] = useState<ColumnData>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (initialData) {
      // Convert persisted tasks to the required format
      const persistedTaskItems = persistedTasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        precentage: task.precentage,
        priority: task.priority,
        completed: task?.completed,
      }));

      // Merge API data + persisted tasks
      const mergedData = Object.keys(initialData).reduce((acc, columnKey) => {
        const column = initialData[columnKey];
        return {
          ...acc,
          [columnKey]: {
            ...column,
            items:
              columnKey === "todoColumn"
                ? [...column.items, ...persistedTaskItems]
                : [...column.items],
          },
        };
      }, {});
      setColumnData(mergedData);
    }
  }, [initialData, persistedTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || !columnData) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    const item = columnData[sInd].items[source.index];
    const itemTitle = item.title;
    const itemId = item.id;
    const newIndex = destination.index;
    const destinationColumn = columnData[dInd];
    const destinationColumnId = destinationColumn.id;
    const destinationColumnTitle = destinationColumn.title;

    console.log(
      `Item ID: ${itemId}, Item Title: ${itemTitle}, New Index: ${newIndex}, Destination Column ID: ${destinationColumnId}, Destination Column Title: ${destinationColumnTitle}`
    );

    toast.success(`Status updated to column ${destinationColumnTitle}`);

    if (sInd === dInd) {
      const column = columnData[sInd];
      const reorderedItems = reorder(
        column.items,
        source.index,
        destination.index
      );

      setColumnData({
        ...columnData,
        [sInd]: {
          ...column,
          items: reorderedItems,
        },
      });
    } else {
      const sourceColumn = columnData[sInd];
      const desColumn = columnData[dInd];

      const itemToDrop = sourceColumn?.items.find(
        (item: any) => item.id.toString() === result.draggableId
      );

      if (itemToDrop && result.destination) {
        const sourceColumnItems = Array.from(sourceColumn.items);
        const destColumnItems = Array.from(desColumn.items);

        sourceColumnItems.splice(result.source.index, 1);
        destColumnItems.splice(result.destination.index, 0, itemToDrop);

        setColumnData({
          ...columnData,
          [sInd]: {
            ...sourceColumn,
            items: sourceColumnItems,
          },
          [dInd]: {
            ...desColumn,
            items: destColumnItems,
          },
        });
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  if (isError) return <div>Error loading data</div>;
  if (!columnData || Object.keys(columnData).length === 0)
    return <div>No data available</div>;

  return (
    <div className="">
      <Toaster
        toastOptions={{
          style: {
            marginLeft: "10px",
          },
        }}
        position="bottom-left"
      />
      <TodoDialog />

      {/* 🔍 Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-4 justify-between">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columnData)?.map(([id, column]) => {
            // filter items by searchQuery
            const filteredItems = column.items.filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <StrictModeDroppable droppableId={id} key={id}>
                {(provided: {
                  droppableProps: JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLDivElement> &
                    React.HTMLAttributes<HTMLDivElement>;
                  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                  placeholder:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <ItemsColumn
                      columnTitle={column.title}
                      columnId={column.id}
                      items={filteredItems} // ✅ use filtered items
                    />
                    {provided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanTodoList;
