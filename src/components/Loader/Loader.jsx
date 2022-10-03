import React, { Component } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';
export default class Loader extends Component {
  render() {
    return (
      <LoaderWrapper>
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </LoaderWrapper>
    );
  }
}
