import { ACTION_TYPE, ROLE } from '../constants';

const initialUserState = {
  hash: null,
  id: null,
  login: null,
  registeredAt: null,
  roleId: ROLE.GUEST,
};

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...payload,
      };

    case ACTION_TYPE.RESET_USER:
      return initialUserState;

    default:
      return state;
  }
};
