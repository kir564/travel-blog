import { getHotels } from '../api';

export const fetchHotels = async (formData) => {
  const hotels = await getHotels(formData);

  if (!hotels.length) {
    return {
      error: 'Отели не найдены.',
      response: null,
    };
  }

  return {
    error: null,
    response: hotels,
  };
};
