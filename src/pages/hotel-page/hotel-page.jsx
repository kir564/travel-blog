import { setCommentsAction, setOrderedHotels } from '../../actions';
import { OPERATION } from '../../constants';

import {
  Button,
  ButtonsBlock,
  Comments,
  CommentForm,
  Loader,
} from '../../components';
import { BlockWrapper } from '../../containers';
import { DetailCardHotel } from './components/detail-card-hotel';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { selectUserLogin, selectUserId } from '../../selectors';
import styled from 'styled-components';

const Wrapper = styled.div``;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
  margin-top: 0;
`;

export const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const serverRequest = useServerRequest();
  const login = useSelector(selectUserLogin);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      setIsLoad(true);
      const [responseHotel, responseComments] = await Promise.all([
        serverRequest(OPERATION.FETCH_HOTEL, id),
        serverRequest(OPERATION.FETCH_HOTEL_COMMENTS, id),
      ]);
      setIsLoad(false);

      const error = responseHotel.error || responseComments.error;

      if (error) {
        setRequestError(error);
      } else {
        setHotel(responseHotel.response);
        dispatch(setCommentsAction(responseComments.response));
      }
    };

    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderHotel = async () => {
    await serverRequest(OPERATION.FETCH_ORDER_HOTEL, login, userId, id).then(
      ({ error, response }) => {
        if (!error) {
          dispatch(setOrderedHotels(response));
        }
      },
    );
  };

  return (
    <Wrapper>
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      {isLoad && <Loader />}
      <BlockWrapper>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        {hotel && <DetailCardHotel hotel={hotel} />}
      </BlockWrapper>
      {hotel && login && (
        <>
          <BlockWrapper>
            <Button onClick={orderHotel}>Забронировать</Button>
          </BlockWrapper>
          <CommentForm
            title="отзыв"
            placeholder="Написать отзыв"
            operation={OPERATION.WRITE_FEEDBACK}
            user={login}
            hotelId={id}
          />
        </>
      )}
      {hotel && <Comments isHotel />}
    </Wrapper>
  );
};
