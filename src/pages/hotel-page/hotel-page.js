import styled from 'styled-components';
import { ButtonsBlock, ControlPanel } from '../../components';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div``;

export const HotelPage = () => {
  const { name } = useParams();

  return (
    <Wrapper>
      <ControlPanel>
        <ButtonsBlock />
      </ControlPanel>
      <ControlPanel>{name}</ControlPanel>
    </Wrapper>
  );
};
