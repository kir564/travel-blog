import styled from 'styled-components';
import { ButtonsBlock, ControlPanel } from '../../components';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { OPERATION } from '../../constants';

const Wrapper = styled.div``;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
  margin-top: 0;
`;

export const HotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [requestError, setRequestError] = useState(null);
  const serverRequest = useServerRequest();

  useEffect(() => {
    serverRequest(OPERATION.FETCH_HOTEL, id).then(({ error, response }) => {
      if (error) {
        setRequestError(error);
      } else {
        setHotel(response);
      }
    });
  }, [id, serverRequest]);

  return (
    <Wrapper>
      <ControlPanel>
        <ButtonsBlock />
      </ControlPanel>
      <ControlPanel>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        {Object.entries(hotel).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </ControlPanel>
    </Wrapper>
  );
};
