import React, { Component } from 'react';

import { toast } from 'react-toastify';
import css from '../Searchbar/SearchBar.module.css';

export default class Searchbar extends Component {
  state = { searchQuery: '' };

  onInputHandler = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Input value can not be empty');
    }
    this.props.submitFormHandler(this.state.searchQuery);
    e.target.reset();
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmitHandler}>
          <button type="submit" className={css.searchForm_button}>
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input
            onInput={this.onInputHandler}
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
        {!searchQuery && (
          <p className={css.infoPlease}>Please enter something</p>
        )}
      </header>
    );
  }
}
