import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import { AppWrapper } from './App.styled';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ModalButton } from 'components/Modal/Modal.styled';

export default function App() {
  const APP_KEY = '8185021-24268e96be1b2c00462570825';
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [modalIsShown, setModalIsShown] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoader(true);
    const getPictures = async params => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${APP_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setHits(prev => [...prev, ...response.data.hits]);
        setLoader(false);
        setTotalHits(response.data.totalHits);

        if (response.data.hits.length === 0) {
          toast.info(`Search request ${query} is not found. Please  try again`);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPictures();
  }, [page, query]);

  const handleLoadMoreBtn = () => {
    setPage(prev => prev + 1);
  };

  const handleSearchQuery = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setHits([]);
      setModalIsShown(false);
    } else {
      toast.info(`Search request ${newQuery} is already chosen`);
    }
  };
  const handleModalInfo = data => {
    if (data) {
      const { largeImg, tags } = data;
      setModalSrc(largeImg);
      setModalAlt(tags);
    }
  };
  const toogleModal = () => {
    setModalIsShown(prev => !prev);
  };

  return (
    <AppWrapper>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Searchbar onSubmit={handleSearchQuery} />
      {hits && (
        <ImageGallery
          hits={hits}
          modalInfo={handleModalInfo}
          modalHandler={toogleModal}
        />
      )}
      {loader && <Loader />}
      {hits.length < totalHits && hits.length > 0 && (
        <Button onClick={handleLoadMoreBtn} />
      )}
      {modalIsShown && (
        <Modal onModalClose={toogleModal}>
          <img src={modalSrc} alt={modalAlt} />
          <ModalButton type="button" onClick={toogleModal}>
            <AiOutlineCloseCircle />
          </ModalButton>
        </Modal>
      )}
    </AppWrapper>
  );
}
