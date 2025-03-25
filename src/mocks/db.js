import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  kanban: {
    id: primaryKey(String),
    title: String,
    items: Array,
  },
});

// Seed initial data
db.kanban.create({
  id: 'todoColumn',
  title: 'ToDo',
  items: [
    {
      id: 1,
      title: "Go for a walk",
      description: "Create Board Pins UI",
      priority: "MEDIUM",
      precentage: 75,
    },
    // ... other initial todo items
  ],
});

db.kanban.create({
  id: 'doingColumn',
  title: 'Doing',
  items: [
    {
      id: 99,
      title: "Create Board Pins UI",
      description: "Create Board Pins UI",
      priority: "MEDIUM",
      precentage: 100,
    },
    // ... other initial doing items
  ],
});

db.kanban.create({
  id: 'doneColumn',
  title: 'done',
  items: [
    {
      id: 9,
      title: "Create Board Pins UI",
      description: "Create Board Pins UI",
      priority: "MEDIUM",
      precentage: 100,
    },
    // ... other initial done items
  ],
});