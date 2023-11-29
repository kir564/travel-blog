import axios from 'axios';
import { URL_DB } from '../configs';

export const deleteSession = (id) =>
  axios({
    url: URL_DB.SESSIONS + '/' + id,
    method: 'delete',
  }).catch((error) => {
    console.log(error.toJSON());
  });
