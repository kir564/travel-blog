import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (loginAuth, passwordAuth) => {
  const user = await getUser(loginAuth);
  console.log('user: ', user);

  if (!user) {
    return {
      error: 'Пользователь с таким именем не найден.',
      response: null,
    };
  }

  const { password, ...rest } = user;

  if (passwordAuth !== password) {
    return {
      error: 'Неверный пароль.',
      response: null,
    };
  }

  return {
    error: null,
    response: {
      hash: sessions.create(rest),
      ...rest,
    },
  };
};
