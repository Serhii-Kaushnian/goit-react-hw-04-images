import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryWrapper } from './ImageGallery.styled';

export default function ImageGallery({ hits, modalHandler, modalInfo }) {
  return (
    <GalleryWrapper>
      {hits.map(hit => {
        return (
          <ImageGalleryItem
            openModal={modalHandler}
            sendData={modalInfo}
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
