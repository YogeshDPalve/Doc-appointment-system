import React from 'react'
import { Form, Input, message } from 'antd'
import '../styles/RegisterStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000';

const Login = () => {
  const navigate = useNavigate();
  // form handler
  const onFinishHandler = async (values) => {
    // console.log(values)
    try {
      const res = await axios.post('api/v1/user/login', values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success('Login Successfull !');
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  }
  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='  register-form'>
          <h1 className='text-center'>Login Form</h1>
          <Form.Item label='Email' name='email' >
            <Input type='email' required />
          </Form.Item>
          <Form.Item label='Password' name='password' >
            <Input type='password' required />
          </Form.Item>
          <Link to='/register' className='m-2'>Not a user Register here</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login