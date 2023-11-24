import { addSession, getSession, deleteSession } from './api';

export const sessions = {
  create: (user) => {
    const hash = Math.random().toFixed(50);

    addSession(hash, user);

    return hash;
  },
  remove: async (hash) => {
    const responseSession = await getSession(hash);

    const [session] = responseSession;

    await deleteSession(session.id);
  },
  access: () => {},
};
