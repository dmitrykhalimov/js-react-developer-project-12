import { styled } from 'styled-components';
import { React, useState} from 'react';
import { authContext } from '../../contexts/authContext';
import axios from 'axios';

import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  console.log(auth);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues = {
        { 
          username: '', 
          password: ''
        }
      }

      validationSchema={Yup.object({
        username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),

      })}

      onSubmit= { async (values) => {
        try {
          const response = await axios.post(
            'api/v1/login', 
            values
          )
          localStorage.setItem('userId', JSON.stringify(response.data));
          auth.logIn();
          const { from } = location.state;
          navigate(from);
        } catch (err) {
          alert('no password')
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true); // говорим что неправильный логин и пароль
            return;
          }
          throw err;
        }
        
      }}
    >

      <StyledForm>
        <label htmlFor="username">First Name</label>
        <Field name="username" type="text" />
        <ErrorMessage name="username" />
        <label htmlFor="password">Last Name</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
        {authFailed ? <p>Ошибка авторизации</p> : null}
      </StyledForm>
    </Formik>
  );
};

export default LoginForm;