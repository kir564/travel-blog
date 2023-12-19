import { Button, ControlPanel, CustomSelect, Input } from '../../components';
import { IoSearchSharp } from 'react-icons/io5';

import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PATH } from '../../constants';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchHotelSchema } from './search-hotel-schema';
import { categoryOptions, quantityOptions } from './select-options';

const Wrapper = styled.div``;

const Buttons = styled.div`
  display: flex;
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

  const onSubmit = (formData) => {
    const data = {};

    for (const [key, content] of Object.entries(formData)) {
      if (content instanceof Object) {
        data[key] = content.value;
      } else {
        data[key] = content;
      }
    }

    console.log('search hotel formData: ', data);
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
      </ControlPanel>
    </Wrapper>
  );
};
