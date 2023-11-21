import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 3rem 0;
`;

export const ControlPanel = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
