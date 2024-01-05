import { useForm } from 'react-hook-form';
import { Button, TextAreaComment } from '../../ui';
import { OPERATION } from '../../../constants';
import { useServerRequest } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { setCommentsAction } from '../../../actions';
import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
`;

export const CommentForm = ({
  title,
  placeholder,
  operation,
  user,
  hotelId,
  defaultValue,
  isEdit,
  setIsEdit,
  id,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: defaultValue || '',
    },
  });

  const serverRequest = useServerRequest();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    if (operation === OPERATION.WRITE_FEEDBACK) {
      serverRequest(OPERATION.WRITE_FEEDBACK, {
        user,
        hotelId,
        text: formData.text,
      }).then(({ error, response }) => {
        dispatch(setCommentsAction(response));
      });

      reset();
    }

    if (operation === OPERATION.UPDATE_HOTEL_COMMENT) {
      serverRequest(OPERATION.UPDATE_HOTEL_COMMENT, {
        id,
        text: formData.text,
      }).then(({ error, response }) => {
        dispatch(setCommentsAction(response));
        setIsEdit(false);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAreaComment placeholder={placeholder} {...register('text')} />
      {isEdit ? (
        <Buttons>
          <Button>Изменить</Button>
          <Button
            type="button"
            margin=" 0 0 0 1rem"
            onClick={() => setIsEdit(false)}
          >
            Отмена
          </Button>
        </Buttons>
      ) : (
        <Button margin="1rem 0 0 0">Оставить {title}</Button>
      )}
    </form>
  );
};
