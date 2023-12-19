import axios from 'axios';
import { URL_DB } from '../configs';

export const getHotel = async (id) =>
  axios({
    url: URL_DB.HOTELS,
    method: 'get',
    params: {
      id,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
