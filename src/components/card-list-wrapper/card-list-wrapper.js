import styled from 'styled-components';
import { DEVICE } from '../../constants';

export const CardListWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.2rem;

  @media (${DEVICE.SMALL}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 330px));
  }
`;
