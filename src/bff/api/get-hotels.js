import axios from 'axios';
import { URL_DB } from '../configs';

export const getHotels = async ({ city, category, quantity }) => {
  console.log(city, category, quantity);
  return axios({
    url: URL_DB.HOTELS,
    method: 'get',
    params: {
      city: city || null,
      category: category || null,
      quantity: quantity || null,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
};
