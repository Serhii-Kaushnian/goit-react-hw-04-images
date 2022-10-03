import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { SearchbarWrapper, Form, FormButton, Input } from './Searchbar.styled';
export default class Searchbar extends Component {
  state = {
    query: '',
  };
  handleQuery = e => {
    this.setState({
      query: e.currentTarget.value.toLowerCase(),
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.info('Search field is empty');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };
  render() {
    return (
      <SearchbarWrapper>
        <Form onSubmit={this.handleFormSubmit}>
          <FormButton type="submit">
            <ImSearch />
            <span className="button-label"></span>
          </FormButton>

          <Input
            onChange={this.handleQuery}
            value={this.state.query}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarWrapper>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
