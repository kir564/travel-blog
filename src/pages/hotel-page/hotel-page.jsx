import { setOrderedHotels } from '../../actions';
import { OPERATION } from '../../constants';

import { Button, ButtonsBlock } from '../../components';
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
  const [requestError, setRequestError] = useState(null);
  const serverRequest = useServerRequest();
  const login = useSelector(selectUserLogin);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    serverRequest(OPERATION.FETCH_HOTEL, id).then(({ error, response }) => {
      if (error) {
        setRequestError(error);
      } else {
        setHotel(response);
      }
    });
  }, []);

  const orderHotel = async () => {
    await serverRequest(
      OPERATION.FETCH_CHANGE_DATA_USER,
      login,
      userId,
      id,
    ).then(({ error, response }) => {
      if (!error) {
        dispatch(setOrderedHotels(response));
      }
    });
  };

  return (
    <Wrapper>
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      <BlockWrapper>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        {hotel && <DetailCardHotel hotel={hotel} />}
      </BlockWrapper>
      {login && (
        <BlockWrapper>
          <Button onClick={orderHotel}>Забронировать</Button>
        </BlockWrapper>
      )}
    </Wrapper>
  );
};
