import React from 'react';
import './NumberInput.css';

const NumberInput = function({ labelText, name, onChange, value, errorMsg, isVertical }) {
  const id = Math.trunc(Math.random() * 1000);
  const handleChange = e => onChange(e, name);
  const cls = ['Number_input'];
  if (isVertical) {
    cls.push('vertical');
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={id}>{labelText}</label>
      <input id={id} name={name} type="text" onChange={handleChange} value={value} />
      {errorMsg ? <span className="error">{errorMsg}</span> : null}
    </div>
  );
};

export default NumberInput;
