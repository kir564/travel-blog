import { ControlPanel, Button, SearchHotel } from '../../components';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants';

import styled from 'styled-components';

const Wrapper = styled.div``;

const Buttons = styled.div`
  display: flex;
`;

export const HomePage = () => {
  return (
    <Wrapper>
      <ControlPanel>
        <Buttons>
          <Button>
            <Link to={PATH.COUNTRIES}>Countries</Link>
          </Button>
          <Button margin="0 2rem">Posts</Button>
        </Buttons>
        <ControlPanel>
          <SearchHotel />
        </ControlPanel>
      </ControlPanel>
    </Wrapper>
  );
};
