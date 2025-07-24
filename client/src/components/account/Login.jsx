import React from 'react'
import { useState , useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
     width: 400px;
     margin: auto;
     box-shadow: 5px 2px 5px 2px rgba(0, 0, 0, 0.6);
`;

const Image = styled('img')({
  width: 100,
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  padding: '50px 0 0'
})

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div, & > button, & > p{
  margin-top: 20px;
  }
`
const LoginBtn = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 2px;
  color: #fff;
  background: #FB641B;
  &:hover {
    background: #d75b1b;
  }
`
const Text = styled(Typography)`
  color: #878787;
  font-size: 15px;
`
const Error = styled(Typography)`
  color: #b78787;
  font-size: 15px;
  margin-top: 10px;
`;

const SignupBtn = styled(Button)`
  text-transform: none;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`
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

    const [account , setAccount] = useState('login')
    const [signup , setSignup] = useState(signupInitialValues)
    const [login , setLogin] = useState(loginInitialValue)
    const [error , setError] = useState('');

    const {setData} = useContext(DataContext)
    const navigate = useNavigate();


    const toggleSignup = () => {
      setAccount( prev => prev === 'login' ? 'signup' : 'login')
      setError('');
    }

    const onSignupValueChange = (e) => {
      setSignup({...signup , [e.target.name]: e.target.value})
      console.log({...signup , [e.target.name]: e.target.value})
    }

    const onLoginValueChange = (e) => {
      setLogin({...login , [e.target.name]: e.target.value})
      console.log({...login , [e.target.name]: e.target.value})
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
      // handle failure response
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
    <Component>

      <Box>
        <Image src={imageURL} alt='login'/>
        { account === 'login' ?
            <Wrapper>
              <TextField variant="standard" value={login.username} onChange={(e) => onLoginValueChange(e) } name='username' label='Enter Username'/>
              <TextField variant="standard" type="password" value={login.password} onChange={(e) => onLoginValueChange(e)} name='password' label='Enter Password'/>

              {error && <Error>{error}</Error>}

              <LoginBtn variant="contained" onClick={loginUser}>Login</LoginBtn>
              <Text style={{textAlign: 'center'}}>OR</Text>
              <SignupBtn onClick={toggleSignup}>Create an account</SignupBtn>
            </Wrapper> 
        :
            <Wrapper>
              <TextField variant="standard" value={signup.name} onChange={(e) => onSignupValueChange(e)} name='name' label='Enter Name'/>
              <TextField variant="standard" value={signup.username} onChange={(e) => onSignupValueChange(e)} name='username' label='Enter Username'/>
              <TextField variant="standard" type="password" value={signup.password} onChange={(e) => onSignupValueChange(e)} name='password' label='Enter Password'/>

              {error && <Error>{error}</Error>}

              <SignupBtn onClick={signupUser} >Signup</SignupBtn>
              <Text style={{textAlign: 'center'}}>OR</Text>
              <LoginBtn variant="contained" onClick={toggleSignup} >Already have an account</LoginBtn>
            </Wrapper>
        } 

      </Box>

    </Component>
  )
}

export default Login