import { deleteHotelComment, getHotelComments } from '../api';

export const removeHotelComment = async (id) => {
  const { data } = await deleteHotelComment(id);

  const comments = await getHotelComments(data.hotelId);

  return {
    error: null,
    response: comments,
  };
};
