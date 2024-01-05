import axios from 'axios';
import { URL_DB } from '../configs';

export const deleteHotelComment = (id) =>
  axios({
    url: URL_DB.HOTEL_COMMENTS + '/' + id,
    method: 'delete',
  }).catch((error) => {
    console.log(error.toJSON());
  });
