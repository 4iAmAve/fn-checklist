import React, { ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { TodoItem } from './dtos/TodoItem';

import './todoItem.css';

interface Props {
  item: TodoItem;
  onChange?: (item: TodoItem) => void;
  onDelete?: (id: number) => void;
}

export const TodoItemPanel = (props: Props) => {
  const { item, onChange, onDelete } = props;
  const [title, setTitle] = useState(item.title);
  const [count, setCount] = useState(item.count);
  const [itemData, setItemData] = useState(item);

  useEffect(() => {
    setItemData(item);
    setCount(item.count);
    setTitle(item.title);
  }, [item])

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCount = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);

    const newItem = {
      ...item,
      count: newCount,
    };
    setCount(newCount);
    setItemData(newItem);
    handleOnChange(newItem);
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newItem = {
      ...item,
      title: e.target.value,
    };
    setTitle(e.target.value);
    setItemData(newItem);
    handleOnChange(newItem);
  }

  const handleChecked = () => {
    const newItem = {
      ...item,
      checked: !item.checked,
    };
    setItemData(newItem);
    handleOnChange(newItem);
  }

  const handleOnChange = debounce((newItem: TodoItem) => {
    onChange && onChange(newItem);
  }, 300);

  const handleDelete = () => onDelete && onDelete(itemData.id);

  return (
    <div className={`fn-todo-item-container ${itemData.checked ? 'checked' : ''}`}>
      <div className={'input-wrapper'}>
        <input type={'text'} value={title} onChange={handleTitleChange} />
        <label className={`role-label ${title.length ? 'small' : ''}`}>Title</label>
      </div>
      <div className={'input-wrapper'}>
        <input type={'text'} value={count} onChange={handleCountChange} />
        <label className={`role-label small`}>Count</label>
      </div>
      <div className={'fn-todo-item-container--actions'}>
        <button onClick={handleChecked} className={itemData.checked ? 'checked' : ''}>
          <div>
            {itemData.checked ? <i className="material-icons">checked</i> : null}
            <span>{itemData.checked ? 'Done' : 'Done?'}</span>
          </div>
        </button>
        <button onClick={handleDelete}>
          <div>
            <i className="material-icons">delete_outline</i>
            <span>Delete</span>
          </div>
        </button>
      </div>
    </div>
  );
}