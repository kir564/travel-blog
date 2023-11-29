import axios from 'axios';
import { URL_DB } from '../configs';

export const getUsers = () =>
  axios
    .get(URL_DB.USERS)
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
