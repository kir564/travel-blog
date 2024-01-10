import { useEffect, useState } from 'react';
import { Button, ButtonsBlock, Loader } from '../../components';
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
  const [isLoad, setIsLoad] = useState(false);
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
      setIsLoad(true);
      Promise.all(
        orderedHotels.map(({ id }) => serverRequest(OPERATION.FETCH_HOTEL, id)),
      )
        .then((data) => {
          const loadedHotels = data.map(({ response }) => response);
          setHotels(loadedHotels || []);
        })
        .finally(() => setIsLoad(false));
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
      {isLoad && <Loader />}
      <BlockWrapper>
        <ButtonsBlock />
      </BlockWrapper>
      <h2>Информация о пользователе:</h2>
      <p>
        <b>Пользователь:</b>
        <span style={{ margin: ' 0 0 0 0.5rem' }}>{login}</span>
      </p>
      <h2>Информация о отелях:</h2>
      {hotels.length === 0 ? (
        <p>Забронированных отелей нет</p>
      ) : (
        orderedHotels.map(({ id, orderedAt }) => (
          <p key={id}>
            <span>
              <b>Название:</b>
              <span style={{ margin: ' 0 0 0 0.5rem' }}>
                <Link to={`/hotels/${id}`}>{getNameHotel(id)}</Link>
              </span>
            </span>
            <span style={{ margin: ' 0 0 0 0.5rem' }}>
              <b>Время заказа:</b>
              <span style={{ margin: ' 0 0 0 0.5rem' }}>{orderedAt}</span>
            </span>
            <Button margin="1rem 0 0 0" onClick={() => cancelOrder(id)}>
              Отменить
            </Button>
          </p>
        ))
      )}
    </Wrapper>
  );
};
