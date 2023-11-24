import { authFormSchema } from './auth-form-schema';
import { setUserAction } from '../../actions';
import { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '../../components';
import { OPERATION } from '../../constants';
import { useServerRequest } from '../../hooks';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 6rem 0;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;

  & > button:disabled {
    box-shadow: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-style: italic;
`;

export const AuthPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();

  const serverRequest = useServerRequest();

  const errorForm =
    errors.login?.message || errors.password?.message || serverError;

  const onSubmit = ({ login, password }) => {
    serverRequest(OPERATION.AUTHORIZE, login, password).then(
      ({ error, response }) => {
        if (error) {
          setServerError(error);
          return;
        } else {
          reset();
          dispatch(setUserAction(response));
        }
      },
    );
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        title={<FiUser />}
        placeholder="login..."
        margin="0 0 0 2rem"
        {...register('login')}
      />
      <Input
        type="password"
        title={<BiLock />}
        placeholder="password..."
        margin="0 0 0 2rem"
        {...register('password')}
      />
      <Button
        padding="0.5rem"
        content="center"
        width="100%"
        disabled={errorForm}
      >
        Войти
      </Button>
      <ErrorMessage>{errorForm}</ErrorMessage>
    </Wrapper>
  );
};
