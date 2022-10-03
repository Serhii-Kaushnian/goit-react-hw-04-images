import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './Button.styled';
import { AiOutlineReload } from 'react-icons/ai';
export default class Button extends Component {
  render() {
    return (
      <ButtonWrapper type="button" onClick={this.props.onClick}>
        <AiOutlineReload />
        <span>Load more</span>
      </ButtonWrapper>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
