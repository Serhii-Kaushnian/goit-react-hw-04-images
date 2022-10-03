import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { Overlay, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.modalCloseKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalCloseKeyDown);
  }
  modalCloseKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };
  modalCloseBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.modalCloseBackDrop}>
        <ModalWrapper>{children}</ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
