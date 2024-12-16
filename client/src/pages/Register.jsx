import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/RegisterStyles.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:4000'
const Register = () => {
  const navigate = useNavigate();
  // form handler
  const onFinishHandler = async (values) => {
    console.log(values)
    try {
      const responce = await axios.post('/api/v1/user/register', values);
      console.log()
      if (responce.data.success) {
        message.success('User Registered Successfully!')
        navigate('/login')
      } else {
        message.error(responce.data.message);
      }


    } catch (error) {
      console.log(error);
      message.error('Something Went Wrong')
    }
  }
  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='  register-form'>
          <h1 className='text-center'>Register Form</h1>
          <Form.Item label='Name' name='name' >
            <Input type='text' required />
          </Form.Item>
          <Form.Item label='Email' name='email' >
            <Input type='email' required />
          </Form.Item>
          <Form.Item label='Password' name='password' >
            <Input type='password' required />
          </Form.Item>
          <Link to='/login' className='m-2'>Already user login here</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default Register