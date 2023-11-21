import { Input } from './components';
import { IoSearchSharp } from 'react-icons/io5';
import styled from 'styled-components';

const Wrapper = styled.div``;

export const Search = () => {
  return (
    <Wrapper>
      <Input
        margin="0 0 0 2rem"
        title={<IoSearchSharp />}
        placeholder="Search for a country..."
      />
    </Wrapper>
  );
};
