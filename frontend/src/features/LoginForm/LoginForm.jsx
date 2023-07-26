import { styled } from 'styled-components';
import React from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';

const StyledForm = styled(Form)`
  background-color: lightblue;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

const LoginForm = () => {
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

      <StyledForm>
        <label htmlFor="login">First Name</label>
        <Field name="login" type="text" />
        <ErrorMessage name="login" />
        <label htmlFor="password">Last Name</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
      </StyledForm>
    </Formik>
  );
};

export default LoginForm;