import { Button, ControlPanel, CustomSelect, Input } from '../../components';
import { IoSearchSharp } from 'react-icons/io5';

import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PATH, OPERATION } from '../../constants';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchHotelSchema } from './search-hotel-schema';
import { categoryOptions, quantityOptions } from './select-options';
import { useServerRequest } from '../../hooks';
import { useState } from 'react';

const Wrapper = styled.div``;

const Buttons = styled.div`
  display: flex;
`;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
  margin-top: 0;
`;

const SearchHotelForm = styled.form``;

export const HomePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: 'Москва',
      quantity: '',
      category: '',
    },
    // resolver: yupResolver(searchHotelSchema),
  });

  const [hotels, setHotels] = useState([]);
  const [requestError, setRequestError] = useState(null);

  const serverRequest = useServerRequest();

  const onSubmit = (formData) => {
    setRequestError(null);

    const data = {};

    for (const [key, content] of Object.entries(formData)) {
      if (content instanceof Object) {
        data[key] = content.value;
      } else {
        data[key] = content;
      }
    }

    serverRequest(OPERATION.FETCH_HOTELS, data).then(({ error, response }) => {
      if (error) {
        setRequestError(error);
      } else {
        setHotels(response);
      }
    });
  };

  return (
    <Wrapper>
      <ControlPanel>
        <Buttons>
          <Button>
            <Link to={PATH.COUNTRIES}>Countries</Link>
          </Button>
          <Button margin="0 2rem">Posts</Button>
        </Buttons>
        <ControlPanel>
          <SearchHotelForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="search"
              title={<IoSearchSharp size="20" />}
              margin="0 0 0 2rem"
              placeholder="city..."
              width="100%"
              {...register('city')}
              disabled
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={quantityOptions}
                  margin="2rem 0"
                  placeholder="Количество человек..."
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={categoryOptions}
                  margin="2rem 0"
                  placeholder="Категория жилого помещения..."
                />
              )}
            />
            <Button
              padding="0.24rem"
              content="center"
              width="100%"
              type="submit"
            >
              Найти
            </Button>
          </SearchHotelForm>
        </ControlPanel>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        {hotels.length !== 0 &&
          hotels.map(({ id, name }) => (
            <p key={id}>
              <Link to={`/hotels/${id}`}>{name}</Link>
            </p>
          ))}
      </ControlPanel>
    </Wrapper>
  );
};
