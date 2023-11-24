import { server } from '../bff';
import { OPERATION } from '../constants';

export const useServerRequest = () => {
  const session = '';

  return (operation, ...params) => {
    const requestParams = [OPERATION.AUTHORIZE, OPERATION.GO_OUT].includes(
      operation,
    )
      ? params
      : [session, ...params];

    return server[operation](...requestParams);
  };
};
