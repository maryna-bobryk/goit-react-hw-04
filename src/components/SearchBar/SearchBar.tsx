import React, { FC } from 'react';
import s from './SearchBar.module.css';
import { ErrorMessage, Formik, FormikHelpers, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { ToastMessages } from '../../types/types';

interface SearchBarProps {
  handleChangeQuery: (query: string) => void;
}

interface FormValues {
  query: string;
}

const SearchBar: FC<SearchBarProps> = ({ handleChangeQuery }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values: FormValues, options: FormikHelpers<FormValues>) => {
    const trimValue = values.query.trim();
    if (trimValue === '') {
      toast.error(ToastMessages.EmptySearch);
      return;
    }
    handleChangeQuery(trimValue);
    options.resetForm();
  };

  const applySchema = () =>
    Yup.object().shape({
      query: Yup.string().trim().min(2, 'Too short').max(20, 'Too long'),
    });

  return (
    <div className={s.form}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={applySchema}>
        <Form>
          <Field name='query' className={s.formInput} type='text' autoComplete='off' autoFocus placeholder='Search images and photos' />
          <ErrorMessage name='query' component='div' className={s.errorMessage} />
          <button className={s.formBtn} type='submit'>
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
