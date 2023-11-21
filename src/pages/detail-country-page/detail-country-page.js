import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { BiLock } from 'react-icons/bi';
import { searchByCountryURL } from '../../configs';
import { Button, DetailCardCountry } from '../../components';
import { DEVICE } from '../../constants';
import styled from 'styled-components';

const DetailWrapper = styled.div`
  padding: 3rem 0;
`;

const ButtonTitle = styled.span`
  margin-left: 0.75rem;
`;

const ButtonsBlock = styled.div`
  display: flex;

  @media (${DEVICE.SMALL}) {
    flex-wrap: wrap;
    gap: 1rem;

    & > button {
      margin: 0;
      line-height: 1.7;
    }
  }
`;

export const DetailCountryPage = () => {
  const [country, setCountry] = useState(null);

  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(searchByCountryURL(name))
      .then(({ data }) => {
        setCountry(data[0]);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, [name]);

  return (
    <DetailWrapper>
      <ButtonsBlock>
        <Button onClick={() => navigate(-1)}>
          <IoArrowBack />
          <ButtonTitle>Back</ButtonTitle>
        </Button>
        <Button margin="0 2rem">Posts</Button>
        <Button>All Posts</Button>
        <Button margin="0 0 0 2rem">
          <BiLock />
          <ButtonTitle>Write Post</ButtonTitle>
        </Button>
      </ButtonsBlock>
      {country && <DetailCardCountry country={country} />}
    </DetailWrapper>
  );
};
