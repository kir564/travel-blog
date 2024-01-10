import { getHotels } from '../api';

export const fetchHotels = async (formData, page) => {
  const response = await getHotels(formData, page);

  if (!response.hotels.length) {
    return {
      error: 'Отели не найдены.',
      response: null,
    };
  }

  return {
    error: null,
    response,
  };
};
