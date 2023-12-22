import { authFormSchema } from './auth-form-schema';
import { setUserAction } from '../../actions';
import { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '../../components';
import { OPERATION, STORAGE_KEY, PATH } from '../../constants';
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

const RegLink = styled.div`
  font-style: italic;
`;

export const AuthPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const userName = useSelector(selectUserLogin);
  const serverRequest = useServerRequest();
  const navigate = useNavigate();

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
          sessionStorage.setItem(STORAGE_KEY.USER, JSON.stringify(response));
          navigate(-1);
        }
      },
    );
  };

  if (userName) {
    return <Navigate to={PATH.HOME} replace />;
  }

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
      <Button
        padding="0.24rem"
        content="center"
        width="100%"
        disabled={errorForm}
      >
        Войти
      </Button>
      <RegLink>
        <Link to={PATH.REGISTER}>Регистрация</Link>
      </RegLink>
      <ErrorMessage>{errorForm}</ErrorMessage>
    </Wrapper>
  );
};
