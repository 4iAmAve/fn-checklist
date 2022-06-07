import React, { ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { TodoItem } from './dtos/TodoItem';

import './todoItem.css';

interface Props {
  item: TodoItem;
  onChange?: (item: TodoItem) => void;
}

export const TrackingTodoItemPanel = (props: Props) => {
  const { item, onChange } = props;
  const [count, setCount] = useState(item.count);
  const [itemData, setItemData] = useState(item);

  useEffect(() => {
    setItemData(props.item);
    setCount(props.item.count)
  }, [props.item]);

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

  return (
    <div className={`fn-tracking-todo-item-container`}>
      <div className={'title-wrapper'}>
        {itemData.title}
      </div>
      <div className={'action-wrapper'}>
        <div className={'input-wrapper'}>
          <input type={'text'} value={count} onChange={handleCountChange} />
          <label className={`role-label small`}>Count</label>
        </div>
        <div>
          <button onClick={handleChecked} className={itemData.checked ? 'checked' : ''}>
            Done?
          </button>
        </div>
      </div>
    </div>
  );
}