import React from 'react';
import clsx from 'clsx';
import s from './Button.module.css';

const Button = ({ size, color, onClick, children }) => {
  const buttonClass = clsx(s.button, s[size], s[color]);

  return (
    <button className={buttonClass} onClick={onClick}>
      {children} {/* Відображаємо дочірні елементи */}
    </button>
  );
};

export default Button;
