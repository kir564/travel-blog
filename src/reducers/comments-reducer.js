import { ACTION_TYPE } from '../constants';

const initialComments = [];

export const commentsReducer = (state = initialComments, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_COMMENTS:
      return payload;
    default:
      return state;
  }
};
