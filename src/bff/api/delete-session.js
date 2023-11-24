import { URL_DB } from '../configs';

export const deleteSession = (id) => {
  return fetch(URL_DB.SESSIONS + '/' + id, {
    method: 'DELETE',
  });
};
