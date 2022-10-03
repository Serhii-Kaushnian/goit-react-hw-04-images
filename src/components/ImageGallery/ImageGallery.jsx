import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryWrapper } from './ImageGallery.styled';
export default class ImageGallery extends Component {
  render() {
    const { hits } = this.props;
    return (
      <GalleryWrapper>
        {hits.map(hit => {
          return (
            <ImageGalleryItem
              openModal={this.props.modalHandler}
              sendData={this.props.modalInfo}
              key={hit.id}
              tags={hit.tags}
              largeImg={hit.largeImageURL}
              smallImg={hit.webformatURL}
            />
          );
        })}
      </GalleryWrapper>
    );
  }
}
ImageGallery.propTypes = {
  modalHandler: PropTypes.func.isRequired,
  modalInfo: PropTypes.func.isRequired,
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
