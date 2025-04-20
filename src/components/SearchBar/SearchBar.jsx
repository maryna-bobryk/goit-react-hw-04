import s from './SearchBar.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values, options) => {
    const trimValue = values.query.trim();
    if (trimValue === '') {
      toast.error('The search field must not be empty.');
    }
    handleChangeQuery(trimValue);
    options.resetForm();
  };

  const applySchema = () =>
    Yup.object().shape({
      query: Yup.string().max(30, 'Too Long!'),
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
