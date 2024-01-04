import { addFeedback, getHotelComments } from '../api';

export const writeFeedback = async ({ text, user, hotelId }) => {
  await addFeedback({ text, user, hotelId });
  const comments = await getHotelComments(hotelId);

  return {
    error: null,
    response: comments,
  };
};
