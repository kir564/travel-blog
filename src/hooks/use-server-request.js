import { useSelector } from 'react-redux';
import { server } from '../bff';
import { OPERATION } from '../constants';
import { selectHash } from '../selectors';

export const useServerRequest = () => {
  const hash = useSelector(selectHash);

  return (operation, ...params) => {
    const requestParams = [OPERATION.AUTHORIZE].includes(operation)
      ? params
      : [hash, ...params];

    return server[operation](...requestParams);
  };
};
