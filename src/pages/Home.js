//Declaration of dependecies used
import React, {useState, useEffect} from 'react'
import {MdDeleteForever, MdModeEdit} from 'react-icons/md'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import * as yup from 'yup'

//Services used
import api from '../services/api'

//Page style
import './Home.css'

//Creating component
const Home = ({history}) => {
  //Hook useState of users
  const [users, setUsers] = useState([])
  const [userUpdate, setUserUpdate] = useState([])

  //Fetch data of the api of users in backend 
  //when start page with Hook useEffect
  useEffect( () => {
    const fetchData = async () => {
    const {data} = await api.get('api/users')
    setUsers(data)
    }
    fetchData()
  }, [])

  //Function of validation of values of edit
  const validation = yup.object().shape({
    fistname: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).required()
  })
  
  //Function of remove user selected
  async function userDelete(item) {
    const resp = await api.delete(`api/users/${item.id}`)
    setUsers(users.filter(vale => vale.id !== item.id))
    alert(resp.data.result)
  }

  //Function call Model and passes the values
  const modelEdit = value => {
    setUserUpdate([value])
  }

  //Function of edit user selected
  const submitEdit = async value => {
    setUserUpdate([])
    const resp = await api.put(`api/users/${value.id}`,value)
    alert(resp.data.result)
    setUsers(users.map(item => {
      return value.id === item.id?value:item
    }))
    document.getElementById("EditUser").innerHTML = ""
  }

  //Function close modal
  const destroyModal = (e) => {
    if (e.target.id === 'EditUser' || e.target.className === 'fechaModal') {
      setUserUpdate([])
    }
  }

  //Function of logout and remover token to localStorage
  const Logout = () => {
    localStorage.removeItem('koa-token')
    history.push('/login')
  }

  //Render component in screen
  return( 
    <>
      <h1>Home</h1>
      <div className="tab-users">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fist Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/*Mapping user vector and rendering 
            each item on a table row*/}
            {users.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fistname}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                  <MdModeEdit
                    className="btnDelEdit" 
                    onClick={()=>modelEdit(item)}
                  />
                </td>
                <td>
                  <MdDeleteForever  
                    className="btnDelEdit" 
                    onClick={()=>userDelete(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*Button of call funciton logout*/}
      <button className="Form-btn" onClick={Logout}>Logout</button>

      {/*Div of the modal component of edit user selected*/}
        {userUpdate.map(item => (
          <div 
            key={item.id} 
            id="EditUser" 
            className="modal-container" 
            onClick={destroyModal}
          >
            <div className="modal">
              <div className="fechaModal">+</div>
              <h2>Editar Usuário</h2>
              <Formik
                initialValues={item}
                validationSchema={validation} 
                onSubmit={submitEdit}
              >
                <Form>
                  <div className="field-modal">
                    <Field name="id" type="hidden" />
                  </div>
                  <div className="field-modal">
                    <Field name="fistname" />
                    <ErrorMessage name="fistname"/>
                  </div>
                  <div className="field-modal">
                    <Field name="lastName" placeholder="Sobrenome" />
                    <ErrorMessage name="lastName" />
                  </div>
                  <div className="field-modal">
                    <Field name="email"  placeholder="Email" />
                    <ErrorMessage name="email"/>
                  </div>
                  <div className="field-modal">
                    <Field name="password" type="password" placeholder="Nova senha"/>
                    <ErrorMessage name="password"/>
                  </div>
                  <button 
                    type="submit" 
                    className="Form-btn"
                  >Editar</button>
                </Form>
              </Formik>
            </div>
          </div>
        ))}
    </>
  )
}

export default Home