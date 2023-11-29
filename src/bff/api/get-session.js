import axios from 'axios';
import { URL_DB } from '../configs';

export const getSession = async (hash) => {
  const url = new URL(URL_DB.SESSIONS);
  url.searchParams.set('hash', hash);

  return axios
    .get(url)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
};
