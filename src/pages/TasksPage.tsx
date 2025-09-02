import KanbanTodoList from "../components/kanban/KanbanTodoList";
import {  CheckSquare } from "lucide-react";

export function TasksPage() {
  return (
    <section className="flex-1  border-card border-[2px] m-6 shadow-lg rounded-2xl  p-6 py-2">
      <div className="flex items-center gap-2 py-6">
        <CheckSquare className="bg-card p-2  rounded-xl h-[40px] text-primary w-[40px]" />
        <div>
          {" "}
          <h1 className="  text-2xl font-bold">Tasks Dashboard </h1>
          <p className="text-grey">
            Grow Your Service Business with MindLuster Cards{" "}
          </p>
        </div>
      </div>
      <KanbanTodoList />
    </section>
  );
}
