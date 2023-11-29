import { Button } from '../button/button';
import { Input } from '../input/input';
import { IoSearchSharp } from 'react-icons/io5';
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div``;

const InnerSearch = styled.form`
  display: flex;
  gap: 1rem;
`;

const HotelList = styled.div``;

export const SearchHotel = () => {
  const [hotels, setHotels] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    setHotels(['Hotel-1', 'Hotel-2', 'Hotel-3']);
  };

  return (
    <Wrapper>
      <InnerSearch onSubmit={onSubmit}>
        <Input
          type="search"
          name="search"
          title={<IoSearchSharp size="20" />}
          margin="0 0 0 2rem"
          placeholder="country, region, hotel..."
          width="100%"
        />
        <Button>Найти</Button>
      </InnerSearch>
      <HotelList>
        {hotels.map((h) => (
          <p key={h}>
            <Link to={`/hotel/${h}`}>{h}</Link>
          </p>
        ))}
      </HotelList>
    </Wrapper>
  );
};
