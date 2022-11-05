import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { id, webformatURL, largeImageURL, onGettingIms } = this.props;

    return (
      <li key={id} className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItem_image}
          src={webformatURL}
          alt=""
          onClick={() => onGettingIms(largeImageURL)}
        />
      </li>
    );
  }
}
