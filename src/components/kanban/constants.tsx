

export const initialTodoItems = [
  {
    id: 1,
    title: "Go for a walk",
    description: "Create Board Pins UI",
    priority: "MEDIUM",

    precentage: 75,
  },
  {
    id: 2,
    title: "Take a nap",
    description: "Create Board Pins UI",
    priority: "High",
    precentage: 25,
  },
  {
    id: 3,
    title: "Read a book",
    description: "Create Board Pins UI",
    priority: "Low",
    precentage: 60,
  },
  {
    id: 4,
    title: "Work out",
    description: "Create Board Pins UI",
    priority: "Low",
    precentage: 70,
  },
  {
    id: 5,
    title: "Learn something new",
    description: "Create Board Pins UI",
    priority: "High",
    precentage: 80,
  },
];

export const initialdoingItems = [
  {
    id: 99,
    title: "Create Board Pins UI",
    description: "Create Board Pins UI",
    priority: "MEDIUM",

    precentage: 100,
  },
  {
    id: 100,
    title: "Create Board Pins UI",
    description: "Create Board Pins UI",
    priority: "MEDIUM",
    precentage: 10,
  },
];
export const initialdoneItems = [
  {
    id: 9,
    title: "Create Board Pins UI",
    description: "Create Board Pins UI",
    priority: "MEDIUM",

    precentage: 100,
  },
  {
    id: 10,
    title: "Create Board Pins UI",
    description: "Create Board Pins UI",
    priority: "MEDIUM",
    precentage: 10,
  },
  {
    id: 11,
    title: "Read a book",
    description: "Create Board Pins UI",
    priority: "Low",
    precentage: 15,
  },
  {
    id: 14,
    title: "Work out",
    description: "Create Board Pins UI",
    priority: "Low",
    precentage: 18,
  },
  {
    id: 15,
    title: "Learn something new",
    description: "Create Board Pins UI",
    priority: "Low",
    precentage: 5,
  },
];

export const initialColumnData = {
  todoColumn: {
    id: 1,
    title: "ToDo",
    items: [...initialTodoItems],
  },
  doingColumn: {
    id: 2,
    title: "Doing",
    items: [...initialdoingItems],
  },
  doneColumn: {
    id: 3,
    title: "done",
    items: [...initialdoneItems],
  },
};












