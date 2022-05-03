import React, { useState, useCallback } from 'react';

import './InputPlusStyles.css';

const plusSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>

interface IInputPlus {
  onAdd: (title: string) => void;
}

const InputPlus: React.FC<IInputPlus> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const addTask = useCallback(() => {
      onAdd(value);
      setValue('');
    }, [value]);

  return (
    <div className="InputPlus">
      <input
        type="text"
        className="InputPlusValue"
        value={value}
        placeholder='Пятое-десятое...'
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
      />
      <button
        disabled={!value}
        onClick={addTask}
        aria-label="Add task"
        className="InputPlusButton">{plusSvg}</button>
    </div>
  );
};

export default InputPlus;
