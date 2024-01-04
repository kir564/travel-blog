import axios from 'axios';
import { URL_DB } from '../configs';
import { getDateFormat } from '../../utils';

export const addFeedback = ({ text, user, hotelId }) => {
  return axios({
    url: URL_DB.HOTEL_COMMENTS,
    method: 'post',
    data: {
      user,
      registeredAt: getDateFormat(),
      hotelId,
      text,
    },
  }).catch((error) => {
    console.log(error.toJSON());
  });
};
