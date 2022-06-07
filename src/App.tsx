import React, { useEffect, useRef, useState } from 'react';

import { shuffle } from './utils/shuffle';
import { Profile } from './Profile';
import { TodoItem } from './dtos/TodoItem';
import { TodoItemPanel } from './TodoItem';
import { getChecklistForProfile, loadPersistedSelection, persistChecklist } from './utils/persistence';

import './App.css';
import './input.css';
import {TrackingTodoItemPanel} from "./TrackingTodoItem";
import {sortByTitle} from "./utils/sort";

function App() {
  const [loaded, setLoaded] = useState(false);
  const checklists = useRef<TodoItem[]>([]);
  const selected = useRef<TodoItem | null>(null);
  const profile = useRef<string>('');
  const [_, setUpdated] = useState<number>(new Date().getTime());

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await loadPersistedSelection();
    setLoaded(true);
  }

  const updateAll = () => setUpdated(new Date().getTime());

  const reset = () => {
    selected.current = null;
    checklists.current = [];
    updateAll();
  }

  const setChecklist = (data: TodoItem[]) => {
    checklists.current = sortByTitle(data);
  }

  const handleProfileChange = (profileName: string) => {
    profile.current = profileName;
    const data = getChecklistForProfile(profileName);
    if (data) {
      localStorage.setItem(`fn-checklist::${profile.current}`, JSON.stringify(data));
      setChecklist(data.items);
    } else {
      reset();
    }
    updateAll();
  }

  const randomizeTracking = () => {
    if (checklists.current.length) {
      const selectables = checklists.current.filter((c) => !c.checked);
      const selection = shuffle(selectables as any);
      selected.current = selection[0] as any;
      updateAll();
    }
  }

  const handleOnTrackingChange = (item: TodoItem) => {
    const newChecklist = checklists.current.filter((c) => c.id !== item.id);
    newChecklist.push(item);

    setChecklist(newChecklist);
    localStorage.setItem(`fn-checklist::${profile.current}`, JSON.stringify(newChecklist));
    persistChecklist(profile.current, newChecklist);

    if (item.checked) {
      randomizeTracking();
    }

    updateAll();
  }

  const handleOnChange = (item: TodoItem) => {
    const newChecklist = checklists.current.filter((c) => c.id !== item.id);
    newChecklist.push(item);

    // setChecklist(newChecklist);
    localStorage.setItem(`fn-checklist::${profile.current}`, JSON.stringify(newChecklist));
    persistChecklist(profile.current, newChecklist);


    if (item.id === selected.current?.id) {
      selected.current = item;
    }

    updateAll();
  }

  const handleDeleteItem = (id: number) => {
    const newChecklist = checklists.current.filter((c) => c.id !== id);

    setChecklist(newChecklist);
    localStorage.setItem(`fn-checklist::${profile.current}`, JSON.stringify(newChecklist));
    persistChecklist(profile.current, newChecklist);


    if (id === selected.current?.id) {
      randomizeTracking();
    }

    updateAll();
  }

  const handleAddItem = () => {
    const newItem: TodoItem = {
      amount: 0,
      checked: false,
      count: 0,
      id: new Date().getTime(),
      stage: 1,
      title: ''
    }
    checklists.current.push(newItem);
    updateAll();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b>Fortnite - TODO me a favour</b>
        </p>
      </header>
      <main className="cr-main">
        <section>
          <div className={'content--action'}>
            <Profile onChange={handleProfileChange} />
            <div className="content--action__ctas">
              <button onClick={randomizeTracking} disabled={!checklists.current.length}>
                <i className="material-icons">pets</i>
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className={'content--selection-container'}>
            <div className={'content--selection'}>
              {
                selected.current ? (
                  <TrackingTodoItemPanel item={selected.current} onChange={handleOnTrackingChange} />
                ) : (
                  <div>Aiaiai, select something finally.</div>
                )
              }
            </div>
          </div>
        </section>
        <section className="cr-selections">
          {
            checklists.current.map((s, i) => (
              <div className={'fn-todo-item-panel'} key={`checklist-key-${i}`}>
                <TodoItemPanel item={s} onChange={handleOnChange} onDelete={handleDeleteItem} />
              </div>
            ))
          }
          <div className={'cr-selections__actions'}>
            <button onClick={handleAddItem}>
              <i className="material-icons">add</i>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
