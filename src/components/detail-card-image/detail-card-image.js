import styled from 'styled-components';
import { DEVICE } from '../../constants';

export const DetailCardImage = styled.img`
  display: block;
  max-width: 600px;
  height: 100%;
  object-fit: contain;
  margin: 4rem auto;

  @media (${DEVICE.MEDIUM}) {
    margin: 0 0 2rem 0;
    max-width: 100%;
  }
`;
