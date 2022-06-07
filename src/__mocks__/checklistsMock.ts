import { PersistedProfileChecklists } from "../dtos/PersistedProfileChecklists";

export const checklistsMock: PersistedProfileChecklists[] = [
  {
    name: 'Sayu',
    items: [],
  },
  {
    name: 'Ave',
    items: [
      {
        amount: 200,
        checked: false,
        count: 2000,
        id: 2,
        stage: 2,
        title: 'Collect items'
      }
    ],
  },
  {
    name: 'Sammy',
    items: [
      {
        amount: 200,
        checked: false,
        count: 2000,
        id: 3,
        stage: 2,
        title: 'Collect items'
      },
      {
        amount: 200,
        checked: true,
        count: 2000,
        id: 4,
        stage: 1,
        title: 'Collect Foo'
      }
    ],
  },
];
