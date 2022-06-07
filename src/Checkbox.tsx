import React from 'react';

interface Props {
  id: number;
  role: string;
  selected: boolean;
  onDeselect: () => void;
}

export function Checkbox(props: Props) {
  const { id, role, selected, onDeselect } = props;
  return (
    <label key={`role-checkbox-${role}-${id}`} className="pure-material-checkbox">
      <input type="checkbox" checked={selected} onChange={() => {}}/>
      <span onClick={onDeselect}>{role}</span>
    </label>
  );
}
