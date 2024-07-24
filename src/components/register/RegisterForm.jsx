import {  Button, FormControl,  FormLabel,  IconButton,  InputAdornment,  Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useMutation} from 'react-query';


const registerUser = async (user) => {
  const response = await axios.post("http://103.104.48.5:8282/api/v1/user/auth/register", user, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
  return response.data;
};


const RegisterForm = () => {
  const navigate = useNavigate();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const userType = "user";

  const [fNameError, setFNameError] = useState('');
  const [lNameError, setLNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const mutation = useMutation(registerUser, {
      onSuccess: () => {
          navigate('/login');
      },
      onError: (error) => {
          setRegistrationError(error.response ? error.response.data.message : error.message);
      }
  });

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

  const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      const validationError = validatePassword(newPassword);
      setPasswordError(validationError);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const fNameValidationError = validateFName(fName);
      const lNameValidationError = validateLName(lName);
      const emailValidationError = validateEmail(email);
      const numberValidationError = validateNumber(number);
      const passwordValidationError = validatePassword(password);

      if (!fNameValidationError &&
          !lNameValidationError &&
          !emailValidationError &&
          !numberValidationError &&
          !passwordValidationError
      ) {
          try {
              
                  const newUser = {
                      firstName: fName,
                      lastName: lName,
                      email: email,
                      phoneNumber: number,
                      password: password,
                      userType: userType
                  };
                  mutation.mutate(newUser);
          } catch (error) {
              setRegistrationError('Error checking email.');
          }
      } else {
          setFNameError(fNameValidationError);
          setLNameError(lNameValidationError);
          setEmailError(emailValidationError);
          setNumberError(numberValidationError);
          setPasswordError(passwordValidationError);
      }
  };

  const handleClickShowPassword = () => {
      setShowPassword((show) => !show);
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