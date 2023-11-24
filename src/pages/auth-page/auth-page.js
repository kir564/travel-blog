import { BiLock } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '../../components';
import { authFormSchema } from './auth-form-schema';
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

  const errorForm = errors.login?.message || errors.password?.message;

  const onSubmit = (data) => {
    console.log('data: ', data);

    if (!errorForm) {
      reset();
    }
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
