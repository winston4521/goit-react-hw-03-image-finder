import React from 'react';
import css from '../Button/Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.button_box}>
      <button onClick={onClick} className={css.load_more} type="button">
        Load more
      </button>
    </div>
  );
};
