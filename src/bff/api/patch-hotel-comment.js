import axios from 'axios';
import { URL_DB } from '../configs';

export const patchHotelComment = (id, updatedComment) =>
  axios({
    url: `${URL_DB.HOTEL_COMMENTS}/${id}`,
    method: 'patch',
    data: {
      text: updatedComment,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
