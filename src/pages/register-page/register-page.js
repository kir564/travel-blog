import { registerFormSchema } from './register-form-schema';
import { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '../../components';
import { OPERATION, PATH } from '../../constants';
import { useServerRequest } from '../../hooks';
import { selectUserLogin } from '../../selectors';
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
  margin-top: 0;
`;

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passCheck: '',
    },
    resolver: yupResolver(registerFormSchema),
  });

  const [serverError, setServerError] = useState();
  const serverRequest = useServerRequest();
  const navigate = useNavigate();
  const userName = useSelector(selectUserLogin);

  const onSubmit = ({ login, password }) => {
    serverRequest(OPERATION.REGISTER, login, password).then(({ error }) => {
      if (error) {
        setServerError(error);
      } else {
        reset();
        navigate(PATH.AUTH);
      }
    });
  };

  if (userName) {
    return <Navigate to={PATH.HOME} replace />;
  }

  const errorForm =
    errors.login?.message ||
    errors.password?.message ||
    errors.passCheck?.message ||
    serverError;

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        title={<FiUser />}
        placeholder="login..."
        margin="0 0 0 2rem"
        {...register('login', {
          onChange: () => setServerError(null),
        })}
      />
      <Input
        type="password"
        title={<BiLock />}
        placeholder="password..."
        margin="0 0 0 2rem"
        {...register('password', {
          onChange: () => setServerError(null),
        })}
      />
      <Input
        type="password"
        title={<BiLock />}
        placeholder="repeat password..."
        margin="0 0 0 2rem"
        {...register('passCheck', {
          onChange: () => setServerError(null),
        })}
      />
      <Button
        padding="0.24rem"
        content="center"
        width="100%"
        disabled={errorForm}
      >
        Зарегистрироваться
      </Button>
      <ErrorMessage>{errorForm}</ErrorMessage>
    </Wrapper>
  );
};
