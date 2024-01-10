import axios from 'axios';
import { URL_DB } from '../configs';

export const getHotels = async ({ city, category, quantity }, page = 1) => {
  console.log('page: ', page);

  return axios({
    url: URL_DB.HOTELS,
    method: 'get',
    params: {
      city: city || null,
      category: category || null,
      quantity: quantity || null,
      _page: page,
      _limit: 8,
    },
  })
    .then((response) => {
      return {
        hotels: response.data,
        total: response.headers['x-total-count'],
      };
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
};
