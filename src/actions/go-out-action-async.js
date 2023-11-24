import { useServerRequest } from '../hooks';
import { OPERATION } from '../constants';
import { resetUserAction } from '../actions';

export const goOutActionAsync = (hash) => (dispatch) => {
  const serverRequest = useServerRequest();

  serverRequest(OPERATION.GO_OUT, hash).then(({ response }) => {
    if (response) {
      dispatch(resetUserAction);
    }
  });
};
