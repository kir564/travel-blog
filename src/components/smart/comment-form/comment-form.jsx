import { useForm } from 'react-hook-form';
import { Button, TextAreaComment } from '../../ui';
import { OPERATION } from '../../../constants';
import { useServerRequest } from '../../../hooks';

export const CommentForm = ({
  title,
  placeholder,
  operation,
  user,
  hotelId,
  setComments,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      text: '',
    },
  });

  const serverRequest = useServerRequest();

  const onSubmit = (formData) => {
    if (operation === OPERATION.WRITE_FEEDBACK) {
      serverRequest(OPERATION.WRITE_FEEDBACK, {
        user,
        hotelId,
        text: formData.text,
      }).then(({ error, response }) => {
        setComments(response);
      });
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAreaComment placeholder={placeholder} {...register('text')} />
      <Button margin="1rem 0 0 0">Оставить {title}</Button>
    </form>
  );
};
