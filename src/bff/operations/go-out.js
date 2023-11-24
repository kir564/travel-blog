import { deleteSession, getSession } from '../api';
import { sessions } from '../sessions';

export const goOut = async (hash) => {
  await sessions.remove(hash);
  // const responseSession = await getSession(hash);

  // const [session] = responseSession;

  // await deleteSession(session.id);

  return {
    response: true,
  };
};
