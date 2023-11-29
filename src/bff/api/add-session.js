import axios from 'axios';
import { URL_DB } from '../configs';

export const addSession = (hash, user) =>
  axios({
    url: URL_DB.SESSIONS,
    method: 'post',
    data: {
      user,
      hash,
    },
  }).catch((error) => {
    console.log(error.toJSON());
  });
