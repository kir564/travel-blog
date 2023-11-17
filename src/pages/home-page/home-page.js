import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CardCountry } from '../../components';
import { ALL_COUNTRIES_URL } from '../../configs';
import { transformCountry } from '../../transforms';
import { DEVICE } from '../../constants';

const CountriesList = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.2rem;

  @media (${DEVICE.SMALL}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 330px));
  }
`;

export const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(ALL_COUNTRIES_URL).then(({ data }) => {
      setCountries(data);
    });
  }, []);

  return (
    <CountriesList>
      {countries.map((country) => (
        <CardCountry key={country.name} country={transformCountry(country)} />
      ))}
    </CountriesList>
  );
};
