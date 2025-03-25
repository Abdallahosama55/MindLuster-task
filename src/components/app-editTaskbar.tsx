// EditTaskDialog.tsx
import * as Dialog from "@radix-ui/react-dialog";
import {X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  priority?: string;
  precentage?: number;
  onSave: (data: { title: string; description: string; priority: string; precentage: number }) => void;
}

interface FormData {
  title: string;
  description: string;
  priority: string;
  precentage: number;
}

export const EditTaskDialog = ({
  open,
  onOpenChange,
  title: initialTitle,
  description: initialDescription,
  priority: initialPriority = "Low",
  precentage: initialPrecentage = 0,
  onSave,
}: EditTaskDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
      priority: initialPriority,
      precentage: initialPrecentage,
    },
  });

  React.useEffect(() => {
    reset({
      title: initialTitle,
      description: initialDescription,
      priority: initialPriority,
      precentage: initialPrecentage,
    });
  }, [initialTitle, initialDescription, reset]);

  const onSubmit = (data: FormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg p-6 focus:outline-none">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Edit Task
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="mb-5 text-sm text-gray-600">
            Make changes to your task here. Click save when you're done.
          </Dialog.Description>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                {...register("title", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={4}
                style={{ resize: "none" }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                {...register("priority")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="High">High</option>
                <option value="MEDIUM">Medium</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="precentage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Progress Percentage
              </label>
              <input
                type="range"
                id="precentage"
                {...register("precentage", { valueAsNumber: true })}
                min="0"
                max="100"
                className="w-full"
              />
              <div className="text-right text-sm text-gray-500">{watch("precentage")}%</div>
            </div>

            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <Button type="submit" disabled={!isDirty}>
                Save changes
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};