import { changeDataUser, getUser } from '../api';
import { getDateFormat } from '../../utils';

export const fetchOrderHotel = async (userLogin, userId, hotelId) => {
  const user = await getUser(userLogin);

  const { hotels } = user;

  const updatedHotels = [
    ...hotels,
    {
      orderedAt: getDateFormat(),
      id: hotelId,
    },
  ];

  await changeDataUser(userId, updatedHotels);

  if (user) {
    return {
      response: updatedHotels,
      error: null,
    };
  }
};
