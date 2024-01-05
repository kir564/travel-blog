import styled from 'styled-components';
import { Comment } from './comment/comment';
import { useSelector } from 'react-redux';
import { selectComments } from '../../../selectors';

const Wrapper = styled.div`
  margin: 1rem 0 0 0;
`;

export const Comments = ({ isHotel }) => {
  const comments = useSelector(selectComments);

  return (
    <Wrapper>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} isHotel={isHotel} />
      ))}
    </Wrapper>
  );
};
