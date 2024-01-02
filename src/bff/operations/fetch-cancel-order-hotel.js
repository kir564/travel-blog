import { changeDataUser, getUser } from '../api';

export const fetchCancelOrderHotel = async (userLogin, userId, hotelId) => {
  const user = await getUser(userLogin);

  const { hotels } = user;

  const updatedHotels = hotels.filter(({ id }) => id !== hotelId);

  await changeDataUser(userId, updatedHotels);

  if (user) {
    return {
      response: updatedHotels,
      error: null,
    };
  }
};
