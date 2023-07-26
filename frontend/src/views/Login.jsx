import React from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ login: '', password: ''}}

      validationSchema={Yup.object({
        login: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),

      })}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >

      <Form>
        <label htmlFor="login">First Name</label>
        <Field name="login" type="text" />
        <ErrorMessage name="login" />
        <label htmlFor="password">Last Name</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SignupForm;