import axios from 'axios';
import { URL_DB } from '../configs';
import { transformUser } from '../../transforms';

export const getUser = async (login) =>
  axios({
    url: URL_DB.USERS,
    method: 'get',
    params: {
      login: login,
    },
  })
    .then(({ data }) => {
      const [user] = data;

      return user && transformUser(user);
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
