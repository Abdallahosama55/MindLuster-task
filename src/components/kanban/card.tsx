import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Edit, MoreHorizontal, TrashIcon } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import { DeleteConfirmationDialog } from "@/components/ui/app-dialogDelete";
import { EditTaskDialog } from "@/components/app-editTaskbar";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/services/taskActions";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface CardProps {
  id?: any;
  title: string;
  draggableId: string;
  index: number;
  precentage: number;
  description: string;
  priority: string;
  priorityID?: string;
  completed?: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  draggableId,
  index,
  precentage,
  description,
  priority,

  completed = false,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(id));
    setIsDeleted(true);
    setIsDeleteModalOpen(false);
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "High":
        return { color: "#52CD8F", backgroundColor: "#52cd9014" };
      case "Low":
        return { color: "#D84949", backgroundColor: "#d8494951" };
      case "MEDIUM":
        return { color: "#6161FF", backgroundColor: "#6161ff5b" };
      default:
        return { color: "black", backgroundColor: "white" };
    }
  };
  const priorityStyles = getPriorityStyles(priority);

  if (isDeleted) return null;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging
              ? "bg-gray-100 text-black"
              : "bg-white text-black"
          } px-5 py-4 font-medium w-full min-h-40 shadow-custom border-blue-100 border-[1px] rounded-xl`}
        >
          <div className="flex">
            <div className="flex-grow font-bold">
              <span
                style={priorityStyles}
                className="px-3 rounded-2xl py-1 text-xs"
              >
                {priority}
              </span>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center">
                  <MoreHorizontal />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-white rounded-md shadow-md border p-1 w-48 z-10">
                <DropdownMenu.Item
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onSelect={() => setIsEditModalOpen(true)}
                >
                  <Edit size={17} className="text-primary" /> Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onSelect={() => setIsDeleteModalOpen(true)}
                >
                  <TrashIcon size={17} color="red" /> Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div className="pt-5">
            <h3
              className={`text-sm font-bold ${
                completed ? "line-through text-gray-500" : ""
              }`}
            >
              {title}
            </h3>
            <p className={`text-sm ${completed ? "text-gray-500" : ""}`}>
              {description}
            </p>
          </div>
          <span className="w-full text-gray-400 flex justify-end text-xs py-1 gap-2">
            {precentage} %
          </span>
          <ProgressBar progress={precentage} bgColor="#6161FF" />

          <EditTaskDialog
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            title={title}
            description={description}
            priority={priority}
            precentage={precentage}
            onSave={({
              title: newTitle,
              description: newDescription,
              priority: newPriority,
              precentage: newPrecentage,
            }) => {
              console.log({
                id,
                title: newTitle,
                description: newDescription,
                priority: newPriority,
                precentage: newPrecentage,
              });
              dispatch(
                updateTask({
                  id,
                  title: newTitle,
                  description: newDescription,
                  priority: newPriority,
                  precentage: newPrecentage,
                })
              );
            }}
          />
          <DeleteConfirmationDialog
            open={isDeleteModalOpen}
            onOpenChange={setIsDeleteModalOpen}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Card;
