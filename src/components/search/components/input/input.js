import { STYLES, DEVICE } from '../../../../constants';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.base};
  box-shadow: ${({ theme }) => theme.shadow.base};
  border-radius: ${STYLES.RADII.MEDIUM};
  padding: 1rem 3rem;

  @media (${DEVICE.SMALL}) {
    width: 100%;
    min-width: 225px;
    padding: 1rem 2rem;
  }

  @media (max-width: 320px) {
    padding: 1rem;
  }
`;

const InputContainer = ({ className, title, ...props }) => {
  return (
    <Wrapper>
      {title}
      <input className={className} {...props} />
    </Wrapper>
  );
};

export const Input = styled(InputContainer)`
  all: unset;
  width: ${({ width }) => width || '140px'};
  margin: ${({ margin }) => margin || 0};
  background-color: ${({ theme }) => theme.color.base};
  border: none;
  color: ${({ theme }) => theme.color.text};
  font-size: ${STYLES.FS.SMALL};
  font-style: italic;
`;
