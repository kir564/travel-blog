import axios from 'axios';
import { URL_DB } from '../configs';
import { ROLE } from '../../constants';
import { getDateFormat } from '../../utils/';

export const addUser = (login, password) =>
  axios({
    url: URL_DB.USERS,
    method: 'post',
    data: {
      login,
      password,
      registered_at: getDateFormat(),
      role_id: ROLE.READER,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
