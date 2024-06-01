import {  Button, FormControl,  FormLabel,  IconButton,  InputAdornment,  Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';


const fetchUsers = async()=>{
  const response = await axios.get("http://localhost:4000/users")
  return response.data
}

const addUser = async(user)=>{
  const response = await axios.post("http://localhost:4000/users" , user)
  return response.data
}

const RegisterForm = () => {

  const navigate = useNavigate()

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const country =""

  const [fNameError, setFNameError] = useState('');
  const [lNameError, setLNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const queryClient = useQueryClient()

  const {data : users}= useQuery("users" ,fetchUsers)

  const mutation = useMutation(addUser , {
    onSuccess:()=>{
      queryClient.invalidateQueries('users')
    }
  })

  const validateFName = (fName) => {
    if (!fName) {
      return 'First name is required';
    }
    return '';
  };

  const validateLName = (lName) => {
    if (!lName) {
      return 'Last name is required';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Enter a valid email';
    }
    return '';
  };

  const validateNumber = (number) => {
    const numberRegex = /^\d{10}$/;
    if (!number) {
      return 'Number is required';
    }
    if (!numberRegex.test(number)) {
      return 'Enter a valid 10-digit number';
    }
    return '';
  };

  const validateName = (name) => {
    if (!name) {
      return 'Username is required';
    }
    if (name.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return 'Username must be alphanumeric';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Confirm password is required';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleFNameChange = (e) => {
    const newFName = e.target.value;
    setFName(newFName);
    const validationError = validateFName(newFName);
    setFNameError(validationError);
  };

  const handleLNameChange = (e) => {
    const newLName = e.target.value;
    setLName(newLName);
    const validationError = validateLName(newLName);
    setLNameError(validationError);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validationError = validateEmail(newEmail);
    setEmailError(validationError);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
    const validationError = validateNumber(newNumber);
    setNumberError(validationError);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUsername(newName);
    const validationError = validateName(newName);
    setNameError(validationError);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    setPasswordError(validationError);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    const validationError = validateConfirmPassword(password, newConfirmPassword);
    setConfirmPasswordError(validationError);
  };

    const handleSubmit = (e)=>{
      e.preventDefault();
      const fNameValidationError = validateFName(fName);
      const lNameValidationError = validateLName(lName);
      const emailValidationError = validateEmail(email);
      const numberValidationError = validateNumber(number);
      const nameValidationError = validateName(username);
      const passwordValidationError = validatePassword(password);
      const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);
  
      if (
        !fNameValidationError &&
        !lNameValidationError &&
        !emailValidationError &&
        !numberValidationError &&
        !nameValidationError &&
        !passwordValidationError &&
        !confirmPasswordValidationError
      ) {
        if (users.find(user => user.email === email)){
          setRegistrationError('An account with this email already exists.');
        }
        else{
          const newUser = { fName, lName, email, number, username, password ,country};
          mutation.mutate(newUser);
          console.log(newUser);
          setFName('')
          setLName('')
          setEmail('')
          setNumber('')
          setUsername('')
          setPassword('')
          setConfirmPassword('')
          setRegistrationError('')
          navigate('/login')
        }
      } else {
        setFNameError(fNameValidationError);
        setLNameError(lNameValidationError);
        setEmailError(emailValidationError);
        setNumberError(numberValidationError);
        setNameError(nameValidationError);
        setPasswordError(passwordValidationError);
        setConfirmPasswordError(confirmPasswordValidationError);
      }   
    }


    const handleClickShowPassword = () => {
      setShowPassword((show) => !show);
    };
  
    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword((show) => !show);
    };
  return (
    <Paper sx={{p:2 , width:'340px' , bgcolor:'transparent'}}>
        <FormControl component="form"  sx={{width:'100%'}} onSubmit={handleSubmit}>
            <FormLabel sx={{textAlign:'center' , fontSize:'25px' , fontWeight:600 , p:2, color:'#9e1a88'}}>Registration</FormLabel>
            <Stack spacing={2} sx={{ display:'flex' , flexDirection:'column' , gap:{xs:'15px' , sm:'15px' , md:'2px'}}}>

            <TextField
        label="First Name"
        size="small"
        value={fName}
        onChange={handleFNameChange}
        required
        error={!!fNameError}
        helperText={fNameError}
        color="primary"
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
      <TextField
        label="Last Name"
        size="small"
        value={lName}
        onChange={handleLNameChange}
        required
        error={!!lNameError}
        helperText={lNameError}
        color="primary"
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
      <TextField
        label="UserName"
        size="small"
        value={username}
        onChange={handleNameChange}
        required
        error={!!nameError}
        helperText={nameError}
        color="primary"
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
      <TextField
        label="Email"
        size="small"
        value={email}
        onChange={handleEmailChange}
        required
        error={!!emailError}
        helperText={emailError}
        color="primary"
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
      <TextField
        label="Number"
        size="small"
        value={number}
        onChange={handleNumberChange}
        required
        error={!!numberError}
        helperText={numberError}
        color="primary"
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
      
      <TextField
        label="Password"
        size="small"
        value={password}
        onChange={handlePasswordChange}
        required
        error={!!passwordError}
        helperText={passwordError}
        color="primary"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff sx={{fontSize:'15px'}}/> : <Visibility sx={{fontSize:'15px'}}/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
      <TextField
        label="Confirm Password"
        size="small"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
        error={!!confirmPasswordError}
        helperText={confirmPasswordError}
        color="primary"
        type={showConfirmPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff sx={{fontSize:'15px'}}/> : <Visibility sx={{fontSize:'15px'}}/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '15px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lightgray',
            },
            '&:hover fieldset': {
              borderColor: '#9e1a88',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9e1a88',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#9e1a88',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '10px',
            my: '0px',
          },
        }}
      />
            <Button type='submit' variant='contained' sx={{ backgroundColor: '#9e1a88','&:hover': {backgroundColor: '#7e146a',},}}>Submit</Button>

            <Typography variant='subtitle2' sx={{fontSize:'13px' , textAlign:'center' }}>You already have an account? 
                <Link to="/login" style={{color:'#9e1a88'}}> Login</Link>
            </Typography>
            </Stack>
        </FormControl>
        {registrationError && <Typography variant='subtitle1' sx={{fontSize:'12px', textAlign:'center' , color:'red'}}>{registrationError}</Typography>}
    </Paper>
  )
}

export default RegisterForm