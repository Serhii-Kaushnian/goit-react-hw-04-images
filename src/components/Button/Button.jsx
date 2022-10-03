import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './Button.styled';
import { AiOutlineReload } from 'react-icons/ai';

export default function Button({ onClick }) {
  return (
    <ButtonWrapper type="button" onClick={onClick}>
      <AiOutlineReload />
      <span>Load more</span>
    </ButtonWrapper>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
