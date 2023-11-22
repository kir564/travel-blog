import styled from 'styled-components';
import { IoArrowBack } from 'react-icons/io5';
import { BiLock } from 'react-icons/bi';
import { Button } from '../../components';
import { DEVICE } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;

  @media (${DEVICE.SMALL}) {
    flex-wrap: wrap;
    gap: 1rem;

    & > button {
      margin: 0;
      line-height: 1.7;
    }
  }
`;

const ButtonTitle = styled.span`
  margin-left: 0.75rem;
`;

export const ButtonsBlock = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack />
        <ButtonTitle>Back</ButtonTitle>
      </Button>
      <Button margin="0 2rem">Posts</Button>
      <Button>All Posts</Button>
      <Button margin="0 0 0 2rem">
        <BiLock />
        <ButtonTitle>Write Post</ButtonTitle>
      </Button>
    </Wrapper>
  );
};
