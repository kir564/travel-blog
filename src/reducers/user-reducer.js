import { ACTION_TYPE, ROLE } from '../constants';

const initialUserState = {
  hash: null,
  id: null,
  login: null,
  registeredAt: null,
  roleId: ROLE.GUEST,
  hotels: [],
  posts: [],
};

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...payload,
      };

    case ACTION_TYPE.SET_ORDERED_HOTELS:
      return {
        ...state,
        hotels: payload,
      };

    case ACTION_TYPE.RESET_USER:
      return initialUserState;

    default:
      return state;
  }
};
