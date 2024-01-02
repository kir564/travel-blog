import axios from 'axios';
import { URL_DB } from '../configs';

export const getHotelComments = async (hotelId) => {
  return axios({
    url: URL_DB.HOTEL_COMMENTS,
    method: 'get',
    params: {
      hotelId,
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
};
