import { addUser, getUsers } from '../api';

export const register = async (loginReg, password) => {
  const users = await getUsers();
  const isExistUser = users.map(({ login }) => login).includes(loginReg);

  if (isExistUser) {
    return {
      error: 'Такой пользователь уже существует',
      response: null,
    };
  }

  const user = await addUser(loginReg, password);

  if (user) {
    return {
      response: true,
      error: null,
    };
  }
};
