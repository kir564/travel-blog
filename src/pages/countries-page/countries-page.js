import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  CardCountry,
  CardListWrapper,
  ControlPanel,
  Search,
  ButtonsBlock,
} from '../../components';
import { ALL_COUNTRIES_URL } from '../../configs';
import { transformCountry } from '../../transforms';
// import { DEVICE } from '../../constants';

// export const CardList = styled.div`
//   margin-top: 2rem;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//   gap: 2.2rem;

//   @media (${DEVICE.SMALL}) {
//     grid-template-columns: repeat(auto-fill, minmax(220px, 330px));
//   }
// `;

export const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter(({ name }) =>
    name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()),
  );

  useEffect(() => {
    axios
      .get(ALL_COUNTRIES_URL)
      .then(({ data }) => {
        setCountries(data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);

  return (
    <>
      <ControlPanel>
        <ButtonsBlock />
      </ControlPanel>
      <ControlPanel>
        <Search setSearch={setSearch} />
      </ControlPanel>
      <CardListWrapper>
        {filteredCountries.map((country) => (
          <CardCountry key={country.name} country={transformCountry(country)} />
        ))}
      </CardListWrapper>
    </>
  );
};
