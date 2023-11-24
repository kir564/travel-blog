import axios from 'axios';
import { URL_DB } from '../configs';
import { transformUser } from '../transformers';

export const getUser = (login) => {
  const url = new URL(URL_DB.USERS);
  url.searchParams.set('login', login);

  return axios
    .get(url)
    .then(({ data }) => {
      const [user] = data;

      return user && transformUser(user);
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
};
