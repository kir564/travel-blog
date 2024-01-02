import { useEffect, useState } from 'react';
import { Button, ButtonsBlock } from '../../components';
import { BlockWrapper } from '../../containers';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserLogin,
  selectOrderedHotels,
  selectUserId,
} from '../../selectors';

import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { OPERATION } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { setOrderedHotels } from '../../actions';

const Wrapper = styled.div``;

export const UserPage = () => {
  const [hotels, setHotels] = useState([]);
  const login = useSelector(selectUserLogin);
  const userId = useSelector(selectUserId);
  const orderedHotels = useSelector(selectOrderedHotels);

  const serverRequest = useServerRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate('/');
    } else {
      Promise.all(
        orderedHotels.map(({ id }) => serverRequest(OPERATION.FETCH_HOTEL, id)),
      ).then((data) => {
        const loadedHotels = data.map(({ response }) => response);
        setHotels(loadedHotels || []);
      });
    }
  }, [orderedHotels]);

  if (!login) {
    return null;
  }

  const getNameHotel = (hotelId) =>
    hotels.find(({ id }) => id === hotelId).name;

  const cancelOrder = (id) => {
    serverRequest(OPERATION.FETCH_CANCEL_ORDER_HOTEL, login, userId, id).then(
      ({ error, response }) => {
        dispatch(setOrderedHotels(response));
      },
    );
  };

  return (
    <Wrapper>
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      <h2>Информация о пользователе:</h2>
      <p>
        <b>Пользователь:</b>
        {login}
      </p>
      <h2>Информация о отелях:</h2>
      {hotels.length &&
        orderedHotels.map(({ id, orderedAt }) => (
          <p key={id}>
            <span>
              <b>Название:</b>
              <Link to={`/hotels/${id}`}>{getNameHotel(id)}</Link>
            </span>
            <span>
              <b>Время заказа:</b>
              {orderedAt}
            </span>
            <Button margin="1rem 0 0 0" onClick={() => cancelOrder(id)}>
              Отменить
            </Button>
          </p>
        ))}
    </Wrapper>
  );
};
