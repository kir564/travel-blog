import { forwardRef } from 'react';
import { STYLES, DEVICE } from '../../constants';
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

const InputContainer = forwardRef(({ className, title, ...props }, ref) => {
  return (
    <Wrapper>
      {title}
      <input className={className} ref={ref} {...props} />
    </Wrapper>
  );
});

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
