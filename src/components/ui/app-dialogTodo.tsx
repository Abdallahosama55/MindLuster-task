import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/services/taskActions";
import { Plus } from "lucide-react";

export const TodoDialog = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [percentage, setPercentage] = useState(0);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      precentage: percentage
    }));

    setTitle("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <>
     <div className=" w-full flex   justify-end my-3 ">
     <Button onClick={() => onOpenChange(true)}>
     <Plus size={16} />
        Add Todo
      </Button>

     </div>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-lg p-6 focus:outline-none">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Create New Todo
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter todo title"
                    required
                  />
                </div>

          

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="MEDIUM">Medium</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="percentage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Progress Percentage
                  </label>
                  <input
                    type="range"
                    id="percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(parseInt(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full"
                  />
                  <div className="text-right text-sm text-gray-500">{percentage}%</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Dialog.Close asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit">Create Todo</Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
