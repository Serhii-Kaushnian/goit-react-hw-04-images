import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onModalClose }) {
  useEffect(() => {
    window.addEventListener('keydown', modalCloseKeyDown);

    return () => {
      window.removeEventListener('keydown', modalCloseKeyDown);
    };
  }, []);

  const modalCloseKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };
  const modalCloseBackDrop = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };
  return createPortal(
    <Overlay onClick={modalCloseBackDrop}>
      <ModalWrapper>{children}</ModalWrapper>
    </Overlay>,
    modalRoot
  );
}
Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
