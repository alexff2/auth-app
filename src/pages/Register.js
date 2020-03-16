import React from 'react'
import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup'

import api from '../services/api'

const Register = ({history}) => {
  const handlerSubmit = async values => {
    const resp = await api.post('api/users',values)
    console.log(resp.data)
    history.push('/login')
  }

  const validation = yup.object().shape({
    fistname: yup.string().min(4).required('Nome do usuário obrigatório'),
    lastName: yup.string().min(4).required('Sobrenome do usuário obrigatório'),
    email: yup
      .string()
      .email('O valor do campo deve ser um e-mail')
      .required('E-mail do usuário obritório'),
    password: yup
      .string()
      .min(4, 'A senha deve conter no mínimo 4 caracteres')
      .required('Obrigatório informar a senha'),
  })

  return (
    <div>
      <h1>Register</h1>
      <Formik onSubmit={handlerSubmit} 
        validationSchema={validation} 
        initialValues={{
          fistname: "",
          lastName: "",
          email: "",
          password: ""
        }}
      >
        <Form>
          <div>
            <Field className="Form-Field" placeholder="Nome" name="fistname"/>
            <ErrorMessage className="Form-Error" name="fistname" />
          </div>
          <div>
            <Field className="Form-Field" placeholder="Sobrenome" name="lastName"/>
            <ErrorMessage className="Form-Error" name="lastName"/>
          </div>
          <div>
            <Field className="Form-Field" placeholder="Email" name="email"/>
            <ErrorMessage className="Form-Error" name="email"/>
          </div>
          <div>
            <Field className="Form-Field" placeholder="Senha" type="password" name="password"/>
            <ErrorMessage className="Form-Error" name="password"/>
          </div>
          <button className="Form-btn" type="submit">Registrar</button>
        </Form>
      </Formik>
      <Link className="btn-regis" to="/">Voltar</Link>
    </div>
  )
}

export default Register