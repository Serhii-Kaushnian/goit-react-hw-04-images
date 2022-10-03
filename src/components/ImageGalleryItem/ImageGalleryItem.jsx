import React, { Component } from 'react';
import {
  GalleryItemImage,
  GalleryItemWrapper,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    src: '',
    alt: '',
  };

  handleModalData = e => {
    const { alt } = e.currentTarget;
    this.setState(
      {
        src: this.props.largeImg,
        alt,
      },
      () => {
        this.props.openModal();
        this.props.sendData(this.state);
      }
    );
  };
  render() {
    const { smallImg, tags } = this.props;
    return (
      <GalleryItemWrapper>
        <GalleryItemImage
          onClick={this.handleModalData}
          src={smallImg}
          alt={tags}
        />
      </GalleryItemWrapper>
    );
  }
}

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  sendData: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
};
