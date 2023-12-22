import { Button, ButtonsBlock, ControlPanel } from '../../components';
import { useSelector } from 'react-redux';
import { selectUserLogin, selectOrderedHotels } from '../../selectors';

import styled from 'styled-components';

const Wrapper = styled.div``;

export const UserPage = () => {
  const login = useSelector(selectUserLogin);
  const hotels = useSelector(selectOrderedHotels);

  return (
    <Wrapper>
      <ControlPanel>
        <ButtonsBlock />
      </ControlPanel>
      <h2>Информация о пользователе:</h2>
      <p>
        <b>Пользователь:</b>
        {login}
      </p>
      <h2>Информация о отелях:</h2>
      {hotels.map(({ id, orderedAt }) => (
        <p key={id}>
          <span>
            <b>Название:</b>
            {id}
          </span>
          <span>
            <b>Время заказа:</b>
            {orderedAt}
          </span>
          <Button margin="1rem 0 0 0">Отменить</Button>
        </p>
      ))}
    </Wrapper>
  );
};
