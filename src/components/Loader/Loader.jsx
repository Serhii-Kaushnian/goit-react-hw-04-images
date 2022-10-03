import { FallingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderWrapper>
      <FallingLines
        color="#3f51b5"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </LoaderWrapper>
  );
}
