import { Button, CustomSelect, Input, Loader } from '../../components';
import { BlockWrapper } from '../../containers';
import { CardHotel } from './components';
import { IoSearchSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PATH, OPERATION, DEVICE } from '../../constants';
import styled from 'styled-components';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { searchHotelSchema } from './search-hotel-schema';
import { categoryOptions, quantityOptions } from './constants/select-options';
import { useServerRequest } from '../../hooks';
import { useState } from 'react';
import { transformHotel } from '../../transforms';
import { useDispatch, useSelector } from 'react-redux';
import { setHotelAction, resetHotelAction } from '../../actions';
import { selectHotels, selectHotelsTotal } from '../../selectors';

import { RotatingLines } from 'react-loader-spinner';

const Wrapper = styled.div``;

const CardListWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.2rem;
  /* overflow: hidden !important; */

  @media (${DEVICE.SMALL}) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 330px));
  }
`;

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
    // formState: { errors },
  } = useForm({
    defaultValues: {
      city: 'Москва',
      quantity: '',
      category: '',
    },
    // resolver: yupResolver(searchHotelSchema),
  });

  const hotels = useSelector(selectHotels);
  const total = useSelector(selectHotelsTotal);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [page, setPage] = useState(1);

  const serverRequest = useServerRequest();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    // let currentPage = page

    setRequestError(null);
    setPage(1);
    reset();
    dispatch(resetHotelAction());

    const data = {};

    for (const [key, content] of Object.entries(formData)) {
      if (content instanceof Object) {
        data[key] = content.value;
      } else {
        data[key] = content;
      }
    }

    setFormData(data);

    setLoading(true);
    serverRequest(OPERATION.FETCH_HOTELS, data, 1).then(
      ({ error, response }) => {
        if (error) {
          setRequestError(error);
        }
        dispatch(setHotelAction(response));
        setLoading(false);
      },
    );
  };

  const onScroll = (page) => {
    serverRequest(OPERATION.FETCH_HOTELS, formData, page).then(
      ({ error, response }) => {
        console.log('response: ', response);
        if (error) {
          setRequestError(error);
        } else {
          dispatch(
            setHotelAction({
              hotels: [...hotels, ...response.hotels],
              total: response.total,
            }),
          );
        }
      },
    );
  };

  return (
    <Wrapper>
      {loading && <Loader />}
      <BlockWrapper>
        <Buttons>
          <Button>
            <Link to={PATH.COUNTRIES}>Countries</Link>
          </Button>
          <Button margin="0 2rem">Posts</Button>
        </Buttons>
        <BlockWrapper>
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
        </BlockWrapper>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        <InfiniteScroll
          dataLength={hotels.length}
          next={() => {
            setPage(page + 1);
            onScroll(page + 1);
          }}
          hasMore={total > hotels.length}
          // loader={<RotatingLines />}
        >
          <CardListWrapper>
            {hotels.map((hotel) => (
              <CardHotel key={hotel.id} hotel={transformHotel(hotel)} />
            ))}
          </CardListWrapper>
        </InfiniteScroll>
      </BlockWrapper>
    </Wrapper>
  );
};
