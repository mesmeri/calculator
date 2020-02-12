import React from 'react';
import Button from '../Button/Button';
import './ButtonRow.css';

const ButtonRow = function({ values, activeButton, onClick, label, name }) {
  const handleChange = e => onClick(e, name);
  const buttons = values.map(value => {
    return (
      <Button value={value} onClick={handleChange} isActive={value == activeButton} key={value}>
        {value}
      </Button>
    );
  });
  return (
    <div className="Button_row" name={name}>
      <p>{label}</p>
      <div className="buttons-wrapper">{buttons}</div>
    </div>
  );
};

export default ButtonRow;
