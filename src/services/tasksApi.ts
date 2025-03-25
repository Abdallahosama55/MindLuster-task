// services/todoService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      transformResponse: (response: any) => {
        // Transform the API response to match our column structure
        const todos = response.todos || [];
        return {
            todoColumn: {
                id: 1,
                title: "ToDo",
                items: todos.slice(0, 5).map((todo: any) => ({
                  id: todo.id.toString(),
                  title: todo.todo,
                  completed: todo.completed,
                  precentage: Math.floor(Math.random() * (100 - 10 + 1)) + 10,
                  priority: ["High", "MEDIUM", "Low"][Math.floor(Math.random() * 3)], 
                }))
              },
              
          doingColumn: {
            id: 2,
            title: "Doing",
            items: todos.slice(5, 10).map((todo: any) => ({
              id: todo.id.toString(),
              title: todo.todo,
              completed: todo.completed,
              precentage:Math.floor(Math.random() * (100 - 10 + 1)) + 10,
              priority: ["High", "MEDIUM", "Low"][Math.floor(Math.random() * 3)]
            }))
          },
          doneColumn: {
            id: 3,
            title: "Done",
            items: todos.slice(10, 15).map((todo: any) => ({
              id: todo.id.toString(),
              title: todo.todo,
              completed: todo.completed,
              precentage:100,
              priority: ["High", "MEDIUM", "Low"][Math.floor(Math.random() * 3)]
            }))
          }
        };
      }
    })
  })
});

export const { useGetTodosQuery } = todoApi;