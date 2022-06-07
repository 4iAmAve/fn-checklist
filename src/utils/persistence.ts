import axios from 'axios';

import { PersistedProfileChecklists } from '../dtos/PersistedProfileChecklists';
import { TodoItem } from "../dtos/TodoItem";
// import { checklistsMock } from '../__mocks__/checklistsMock';

let persistedChecklists: PersistedProfileChecklists[] = [];

export const loadPersistedSelection = async (): Promise<PersistedProfileChecklists[]> => {
  try {
    const { data } = await axios.get('./assets/checklists.json');
    persistedChecklists = data;
    localStorage.setItem(`fn-checklist`, JSON.stringify(persistedChecklists));
    return data;
  } catch (e) {
    console.error('Loading persisted checklists failed: ', e);
    const persistedChecklist = localStorage.getItem(`fn-checklist`);
    if (persistedChecklist) {
      persistedChecklists = JSON.parse(persistedChecklist);
      return persistedChecklists;
    }

    // persistedChecklists = checklistsMock;
    // return checklistsMock;
    return [];
  }
};

export const getChecklistForProfile = (profile: string): PersistedProfileChecklists | undefined => {
  return persistedChecklists.find((p) => p.name === profile);
};

export const persistChecklist = async (profile: string, items: TodoItem[]): Promise<void> => {
  let prev = [...persistedChecklists];
  prev = prev.filter((p) => p.name !== profile);
  prev.push({
    name: profile,
    items
  });
  localStorage.setItem(`fn-checklist`, JSON.stringify(prev));
  await axios.post('./assets/update.php', JSON.stringify(prev));
  persistedChecklists = prev;
}