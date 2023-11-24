import { URL_DB } from '../configs';

export const addSession = (hash, user) =>
  fetch(URL_DB.SESSIONS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user,
      hash,
    }),
  });
