// tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  precentage: number;
  completed?: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadFetchedTasks: (state, action: PayloadAction<Task[]>) => {
      const existingIds = new Set(state.tasks.map(task => task.id));
      const newTasks = action.payload.filter(task => !existingIds.has(task.id));
      state.tasks = [...state.tasks, ...newTasks];
    },
    addTask: (state, action: PayloadAction<{ id: string; title: string; description: string; priority?: string; precentage?: number }>) => {
      state.tasks.push({
        ...action.payload,
        priority: action.payload.priority || 'Low',
        precentage: action.payload.precentage || 0
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; title: string; description: string, priority: string, precentage: number }>) => {
      const { id, title, description, priority, precentage } = action.payload;
      const task = state.tasks.find(task => String(task.id) === String(id));
      if (task) {
        return {
          ...state,
          tasks: state.tasks.map(t =>
            String(t.id) === String(id)
              ? { ...t, title, description, priority, precentage }
              : t
          )
        };
      }
      return state;
    },
  },
});

export const { addTask, deleteTask, updateTask, loadFetchedTasks } = tasksSlice.actions;
export default tasksSlice.reducer;