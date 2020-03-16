import React from 'react'
import {Link} from 'react-router-dom'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import api from '../services/api'

import './Login.css'

const Login = ({ history }) => {
  const handlerSubmit = async value => {
    const resp = await api.post('/api/auth', value)
    localStorage.setItem('koa-token', resp.data)
    history.push('/')
  }
  const validations = yup.object().shape({
    email: yup
      .string()
      .email('O valor do campo deve ser um e-mail')
      .required('Campo de e-mail obrigatório'),
    password: yup
      .string()
      .required('Campo de senha obrigatório')
      .min(4, 'Senha deve conter no mínimo 4 caracteres')
  })
  return(
    <div>
      <h1>Login</h1>
      <p>Fill the fields to continue</p>
      <Formik  
        onSubmit={handlerSubmit} 
        initialValues={{email: "", password: ""}} 
        validationSchema={validations}
      >
        <Form className="Form">
          <div className="Form-group">
            <Field className="Form-Field" name="email" placeholder="Email"/>
            <ErrorMessage className="Form-Error" component="span" name="email" />
          </div>
          <div className="Form-group">
            <Field className="Form-Field" name="password" type="password" placeholder="Senha"/>
            <ErrorMessage className="Form-Error" component="span" name="password"/>
          </div>
          <button className="Form-btn" type="submit">Login</button>
        </Form>
      </Formik>
      <Link className="btn-regis" to="/register">Registrar-se</Link>
    </div>
)}
export default Login