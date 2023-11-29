import { sessions } from '../sessions';

export const goOut = async (hash) => {
  await sessions.remove(hash);

  return {
    response: true,
  };
};
