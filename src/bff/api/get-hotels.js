import axios from 'axios';
import { URL_DB } from '../configs';

export const getHotels = async ({ city, category, quantity }) =>
  axios({
    url: URL_DB.HOTELS,
    method: 'get',
    params: {
      city,
      category,
      quantity,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
