import React from 'react'
import { useState, useContext } from 'react';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

const signupInitialValues = {
  name: '',
  username: '',
  password: '',
}

const loginInitialValue = {
  username: '',
  password: '',
}

const Login = ({isUserAuthenticated}) => {

    const imageURL = '/logo.png';

    const [account, setAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginInitialValue)
    const [error, setError] = useState('');

    const {setData} = useContext(DataContext)
    const navigate = useNavigate();

    const toggleSignup = () => {
      setAccount( prev => prev === 'login' ? 'signup' : 'login')
      setError('');
    }

    const onSignupValueChange = (e) => {
      setSignup({...signup, [e.target.name]: e.target.value})
      console.log({...signup, [e.target.name]: e.target.value})
    }

    const onLoginValueChange = (e) => {
      setLogin({...login, [e.target.name]: e.target.value})
      console.log({...login, [e.target.name]: e.target.value})
    }

    const signupUser = async() => {
      if (!signup.name || !signup.username || !signup.password) {
        setError('Please fill all the fields.');
        return;
      }
      try {
        console.log("Sending Signup :", signup);

        let response = await API.userSignup(signup);

        console.log("API response:", response);

        if(response.isSuccess) {
          console.log('Signup successful', response.data);
          setError('');
          setSignup(signupInitialValues);
          setAccount('login');
        } else {
          console.error('Signup failed', response);
          setError(response.msg?.message || 'Something went wrong! Please try again later');
        }

      } catch(error) {
        console.error('Signup error', error);
        setError(error.message);
      }
    }

    const loginUser = async () => {
      if (!login.username || !login.password) {
        setError('Please enter both username and password.');
        return;
      }

      try {
        let response = await API.userLogin(login)
        if(response.isSuccess){
          setError('');

          sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);

          setData({username: response.data.username,name: response.data.name})

          isUserAuthenticated(true)
          navigate('/')
        } else {
          setError("Something went wrong! Please try again later");
        }
      } catch (error) {
          setError(error?.message || 'Something went wrong')
      }
    }

    return (
      <div className="w-[400px] mx-auto shadow-[5px_2px_5px_2px_rgba(0,0,0,0.6)] p-6">
        <div className="flex flex-col items-center">
          <img 
            src={imageURL} 
            alt='login' 
            className="w-[100px] mx-auto flex rounded-full pt-[50px]"
          />
          
          {account === 'login' ? (
            <div className="p-[25px_35px] flex flex-col space-y-5">
              <input
                type="text"
                value={login.username}
                onChange={onLoginValueChange}
                name='username'
                placeholder='Enter Username'
                className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
              />
              <input
                type="password"
                value={login.password}
                onChange={onLoginValueChange}
                name='password'
                placeholder='Enter Password'
                className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
              />

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              <button
                onClick={loginUser}
                className="h-12 rounded-sm text-white bg-orange-600 hover:bg-orange-700 px-4 py-2"
              >
                Login
              </button>
              
              <p className="text-gray-500 text-sm text-center">OR</p>
              
              <button
                onClick={toggleSignup}
                className="h-12 rounded-sm text-blue-600 hover:text-blue-700 px-4 py-2 shadow-sm"
              >
                Create an account
              </button>
            </div>
          ) : (
            <div className="p-[25px_35px] flex flex-col space-y-5">
              <input
                type="text"
                value={signup.name}
                onChange={onSignupValueChange}
                name='name'
                placeholder='Enter Name'
                className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
              />
              <input
                type="text"
                value={signup.username}
                onChange={onSignupValueChange}
                name='username'
                placeholder='Enter Username'
                className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
              />
              <input
                type="password"
                value={signup.password}
                onChange={onSignupValueChange}
                name='password'
                placeholder='Enter Password'
                className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
              />

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              <button
                onClick={signupUser}
                className="h-12 rounded-sm text-blue-600 hover:text-blue-700 px-4 py-2 shadow-sm"
              >
                Signup
              </button>
              
              <p className="text-gray-500 text-sm text-center">OR</p>
              
              <button
                onClick={toggleSignup}
                className="h-12 rounded-sm text-white bg-orange-600 hover:bg-orange-700 px-4 py-2"
              >
                Already have an account
              </button>
            </div>
          )}
        </div>
      </div>
    )
}

export default Login
