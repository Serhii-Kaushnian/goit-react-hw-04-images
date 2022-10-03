import { useState, useEffect } from 'react';

import {
  GalleryItemImage,
  GalleryItemWrapper,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  sendData,
  openModal,
  largeImg,
  smallImg,
  tags,
}) {
  const handleModalData = () => {
    sendData({ largeImg, tags });
    openModal();
  };

  return (
    <GalleryItemWrapper>
      <GalleryItemImage onClick={handleModalData} src={smallImg} alt={tags} />
    </GalleryItemWrapper>
  );
}

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  sendData: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
};
