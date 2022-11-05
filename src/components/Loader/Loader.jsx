import React from 'react';
import { SpinnerInfinity } from 'spinners-react';
import css from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <SpinnerInfinity
        className=""
        size={100}
        thickness={81}
        speed={94}
        color="rgba(90, 211, 224, 0.79)"
      />
    </div>
  );
}
