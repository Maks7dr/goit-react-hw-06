import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    telephone: '',
  };

  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    telephone: Yup.string()
      .matches(/^[+]?[-0-9\s]{7,15}$/, 'Must be a valid telephone!')
      .required('Required'),
  });

  const nameFieldId = useId();
  const telFieldId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.username,
      number: values.telephone,
    };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="username"
            id={nameFieldId}
          />
          <ErrorMessage name="username" component="div" className={css.error} />

          <label className={css.label} htmlFor={telFieldId}>
            Number
          </label>
          <Field
            className={css.field}
            type="tel"
            name="telephone"
            id={telFieldId}
          />
          <ErrorMessage
            name="telephone"
            component="div"
            className={css.error}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
