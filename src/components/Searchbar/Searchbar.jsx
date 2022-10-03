import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { SearchbarWrapper, Form, FormButton, Input } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQuery = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.info('Search field is empty');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <SearchbarWrapper>
      <Form onSubmit={handleFormSubmit}>
        <FormButton type="submit">
          <ImSearch />
          <span className="button-label"></span>
        </FormButton>

        <Input
          onChange={handleQuery}
          value={query}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
