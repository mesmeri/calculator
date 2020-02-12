import React from 'react';
import './Button.css';

const Button = function(props) {
  const cls = ['Button'];
  if (props.isActive) {
    cls.push('active');
  }
  return (
    <button className={cls.join(' ')} value={props.value} onClick={props.onClick}>
      {props.labelText}
      {props.children}
    </button>
  );
};

export default Button;
