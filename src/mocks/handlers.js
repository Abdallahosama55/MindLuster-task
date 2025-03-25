
import { http, HttpResponse } from 'msw';
import { db } from './db';

export const handlers = [
   
        http.get('/api/kanban', () => {
          return HttpResponse.json([
            {
              id: "column-1",
              title: "To Do",
              items: [
                { id: "task-1", title: "Task 1" },
                { id: "task-2", title: "Task 2" },
              ],
            },
            {
              id: "column-2",
              title: "In Progress",
              items: [],
            },
            {
              id: "column-3",
              title: "Done",
              items: [],
            },
          ]);
        }),
      
      
    // Update a column
    http.put('/api/kanban/:id', async ({ params, request }) => {
      const { id } = params;
      const updatedData = await request.json();
  
      const updatedColumn = db.kanban.update({
        where: { id: { equals: id } },
        data: updatedData,
      });
  
      return HttpResponse.json(updatedColumn);
    }),
  
 
    http.get('/tasks', () => {
      const tasks = db.tasks.getAll(); 
      return HttpResponse.json(tasks);
    }),
  ];
  
