import React from 'react';
import './Select.css';

const Select = function({ variants, labelText, name, onChange, value }) {
  const handleChange = e => onChange(e, name);
  const id = Math.trunc(Math.random() * 1000);
  const options = variants.map(variant => {
    return (
      <option value={variant} key={variant}>
        {variant}
      </option>
    );
  });
  return (
    <div className="Select">
      <label htmlFor={id}>{labelText}</label>
      <select id={id} onChange={handleChange} value={value}>
        {options}
      </select>
    </div>
  );
};
export default Select;
