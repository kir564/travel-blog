import { getHotelComments } from '../api';

export const fetchHotelComments = async (hotelId) => {
  const comments = await getHotelComments(hotelId);

  return {
    error: null,
    response: comments,
  };
};
