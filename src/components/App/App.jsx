import React, { Component } from 'react';
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
export default class App extends Component {
  APP_KEY = '8185021-24268e96be1b2c00462570825';
  state = {
    query: '',
    hits: [],
    totalHits: 0,
    page: 1,
    loader: false,
    modalIisShown: false,
    modalComponents: {
      src: 'https://pixabay.com/get/gd53389845b169af23c624d89bd4d84d73b53ab4e93fea5efdadbd93768de75604e58472320ef2e98d8d658c0ec3e3662_640.jpg',
      alt: 'cat',
    },
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({
        loader: true,
      });
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=${this.APP_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        this.setState(prev => {
          return {
            hits: [...prev.hits, ...response.data.hits],
            loader: false,
            totalHits: response.data.totalHits,
          };
        });
        if (response.data.hits.length === 0) {
          toast.info(
            `Search request ${this.state.query} is not found. Please  try again`
          );
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  toogleModal = () => {
    this.setState(({ modalIisShown }) => ({
      modalIisShown: !modalIisShown,
    }));
  };
  handleModalInfo = data => {
    if (data) {
      const { src, alt } = data;
      this.setState({
        modalComponents: {
          src,
          alt,
        },
      });
    }
  };
  handleSearchQuery = query => {
    if (query !== this.state.query) {
      this.setState({
        query,
        page: 1,
        hits: [],
        modalIisShown: false,
      });
    } else {
      toast.info(`Search request ${query} is already chosen`);
    }
  };
  handleLoadMoreBtn = () => {
    this.setState(prev => {
      return { page: prev.page + 1 };
    });
  };

  render() {
    const { hits, totalHits, loader, modalIisShown } = this.state;
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

        <Searchbar onSubmit={this.handleSearchQuery} />
        {hits && (
          <ImageGallery
            hits={hits}
            modalInfo={this.handleModalInfo}
            modalHandler={this.toogleModal}
          />
        )}
        {loader && <Loader />}
        {hits.length < totalHits && hits.length > 0 && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
        {modalIisShown && (
          <Modal onModalClose={this.toogleModal}>
            <img
              src={this.state.modalComponents.src}
              alt={this.state.modalComponents.alt}
            />
            <ModalButton type="button" onClick={this.toogleModal}>
              <AiOutlineCloseCircle />
            </ModalButton>
          </Modal>
        )}
      </AppWrapper>
    );
  }
}
