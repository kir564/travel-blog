import axios from 'axios';
import { URL_DB } from '../configs';

export const changeDataUser = (userId, updatedHotels) =>
  axios({
    url: `${URL_DB.USERS}/${userId}`,
    method: 'patch',
    data: {
      hotels: updatedHotels,
    },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.toJSON());
    });
