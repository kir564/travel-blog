import { getHotel } from '../api';

export const fetchHotel = async (id) => {
  const hotel = await getHotel(id);

  if (!hotel.length) {
    return {
      error: 'Отель не найден.',
      response: null,
    };
  }

  return {
    error: null,
    response: hotel[0],
  };
};
