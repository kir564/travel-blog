import styled from 'styled-components';
import { DEVICE } from '../../constants';

export const Container = styled.div`
  width: 100%;
  max-width: 992px;
  margin: 0 auto;

  @media ${DEVICE.LARGE} {
    padding: 0 2rem;
  }

  @media ${DEVICE.SMALL} {
    max-width: 330px;
  }
`;
