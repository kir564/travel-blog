import { patchHotelComment, getHotelComments } from '../api';

export const updateHotelComment = async ({ id, text }) => {
  const { hotelId } = await patchHotelComment(id, text);

  const comments = await getHotelComments(hotelId);

  return {
    error: null,
    response: comments,
  };
};
