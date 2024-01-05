import { FiUser, FiCalendar, FiTrash, FiPenTool } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { CommentForm } from '../../comment-form/comment-form';
import styled from 'styled-components';
import { selectUserLogin } from '../../../../selectors';
import { OPERATION } from '../../../../constants';
import { setCommentsAction } from '../../../../actions';
import { useState } from 'react';

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
  margin: 0 0 1rem 0;
`;

const Panel = styled.div``;

const Info = styled.div`
  margin: 1rem 0 0 0;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
`;

const InnerItem = styled.div`
  margin: 0 0 0 0.5rem;
`;

const Control = styled.div`
  margin: 0 0 0 1rem;
  display: flex;
  gap: 0.5rem;
`;

export const Comment = ({ comment, isHotel }) => {
  const { text, user, registeredAt, id, hotelId } = comment;

  const [isEdit, setIsEdit] = useState(false);

  const login = useSelector(selectUserLogin);
  const isUserComment = user === login;

  const serverRequest = useServerRequest();
  const dispatch = useDispatch();

  const deleteComment = () => {
    if (isHotel) {
      serverRequest(OPERATION.REMOVE_HOTEL_COMMENT, id).then(
        ({ error, response }) => {
          dispatch(setCommentsAction(response));
        },
      );
    }
  };

  const editComment = () => {
    setIsEdit(true);
  };

  const updateComment = () => {
    if (isHotel) {
      serverRequest(OPERATION.UPDATE_HOTEL_COMMENT, id).then(
        ({ error, response }) => {
          dispatch(setCommentsAction(response));
        },
      );
    }
  };

  return (
    <Wrapper>
      {isEdit ? (
        <CommentForm
          defaultValue={text}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          operation={OPERATION.UPDATE_HOTEL_COMMENT}
          id={id}
          hotelId={hotelId}
        />
      ) : (
        <div>{text}</div>
      )}
      <Panel>
        <Info>
          <InfoItem>
            <FiUser />
            <InnerItem>{user}</InnerItem>
            {isUserComment && !isEdit && (
              <Control>
                <FiTrash cursor="pointer" onClick={deleteComment} />
                <FiPenTool cursor="pointer" onClick={editComment} />
              </Control>
            )}
          </InfoItem>
          <InfoItem>
            <FiCalendar />
            <InnerItem>{registeredAt.split(' ')[0]}</InnerItem>
          </InfoItem>
        </Info>
      </Panel>
    </Wrapper>
  );
};
