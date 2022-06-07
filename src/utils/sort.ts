import {TodoItem} from "../dtos/TodoItem";

export const sortByTitle = (arr: TodoItem[]) => {
  return arr.sort((a, b) => {
    const textA = a.title.toUpperCase();
    const textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
}