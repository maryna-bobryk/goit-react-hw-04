import s from './ErrorMessage.module.css';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ErrorMessage = () => {
  useEffect(() => {
    toast.error('Something went wrong!');
  }, []);

  return (
    <div className={s.errorWrapper}>
      <p className={s.errorText}>Try reloading the page and see if that fixes it.</p>
    </div>
  );
};

export default ErrorMessage;
