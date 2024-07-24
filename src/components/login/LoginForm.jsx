import { useState } from 'react';
import { Button, FormControl, FormLabel, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Enter a valid email';
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

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validationError = validateEmail(newEmail);
    setEmailError(validationError);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationError = validatePassword(newPassword);
    setPasswordError(validationError);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (!emailValidationError && !passwordValidationError) {
      await login(email, password);
    } else {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
    }
  };

  return (
    <Paper sx={{ p: 2, width: '340px', bgcolor: 'transparent' }}>
      <FormControl component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
        <FormLabel sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 600, p: 2, color: '#9e1a88' }}> LOGIN</FormLabel>
        <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '15px', sm: '15px', md: '2px' } }}>
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
              '& .MuiInputBase-input': { fontSize: '15px' },
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
            type={showPassword ? 'text' : 'password'}
            color="primary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {password && (
                    <IconButton onClick={handleClickShowPassword} disableRipple edge="end">
                      {showPassword ? <VisibilityOff sx={{ fontSize: '15px' }} /> : <Visibility sx={{ fontSize: '15px' }} />}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-input': { fontSize: '15px' },
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
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#9e1a88', '&:hover': { backgroundColor: '#7e146a' } }}>
            Submit
          </Button>
          <Typography variant="subtitle2" sx={{ fontSize: '13px', cursor: 'pointer', fontWeight: 400, textAlign: 'end' }}>
            Forget Password ?
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: '13px', textAlign: 'center' }}>
            Don&apos;t have an account? 
            <Link to="/register" style={{ color: '#9e1a88' }}> Sign Up</Link>
          </Typography>
        </Stack>
      </FormControl>
    </Paper>
  );
};

export default LoginForm;










































// import { useState } from 'react';
// import { Button, FormControl, FormLabel, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../utils/AuthContext';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useMutation } from 'react-query';

// const LoginForm = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   // Use React Query's useMutation for login
//   const { mutate: performLogin, isLoading, isError, error } = useMutation(
//     (loginData) => login(loginData.email, loginData.password),
//     {
//       onError: (err) => {
//         console.error('Login error:', err);
//         alert('Login failed: Invalid email or password');
//       }
//     }
//   );

//   const validateEmail = (email) => {
//     if (!email) {
//       return 'Email is required';
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return 'Enter a valid email';
//     }
//     return '';
//   };

//   const validatePassword = (password) => {
//     if (!password) {
//       return 'Password is required';
//     }
//     if (password.length < 8) {
//       return 'Password must be at least 8 characters long';
//     }
//     if (!/[A-Z]/.test(password)) {
//       return 'Password must contain at least one uppercase letter';
//     }
//     if (!/[a-z]/.test(password)) {
//       return 'Password must contain at least one lowercase letter';
//     }
//     if (!/[0-9]/.test(password)) {
//       return 'Password must contain at least one number';
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       return 'Password must contain at least one special character';
//     }
//     return '';
//   };

//   const handleEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     const validationError = validateEmail(newEmail);
//     setEmailError(validationError);
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     const validationError = validatePassword(newPassword);
//     setPasswordError(validationError);
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword((show) => !show);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const emailValidationError = validateEmail(email);
//     const passwordValidationError = validatePassword(password);

//     if (!emailValidationError && !passwordValidationError) {
//       performLogin({ email, password });
//     } else {
//       setEmailError(emailValidationError);
//       setPasswordError(passwordValidationError);
//     }
//   };

//   return (
//     <Paper sx={{ p: 2, width: '340px', bgcolor: 'transparent' }}>
//       <FormControl component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
//         <FormLabel sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 600, p: 2, color: '#9e1a88' }}> LOGIN</FormLabel>
//         <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '15px', sm: '15px', md: '2px' } }}>
//           <TextField
//             label="Email"
//             size="small"
//             value={email}
//             onChange={handleEmailChange}
//             required
//             error={!!emailError}
//             helperText={emailError}
//             color="primary"
//             sx={{
//               '& .MuiInputBase-input': { fontSize: '15px' },
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: 'lightgray',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#9e1a88',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#9e1a88',
//                 },
//               },
//               '& .MuiInputLabel-root.Mui-focused': {
//                 color: '#9e1a88',
//               },
//               '& .MuiFormHelperText-root': {
//                 fontSize: '10px',
//                 my: '0px',
//               },
//             }}
//           />
//           <TextField
//             label="Password"
//             size="small"
//             value={password}
//             onChange={handlePasswordChange}
//             required
//             error={!!passwordError}
//             helperText={passwordError}
//             type={showPassword ? 'text' : 'password'}
//             color="primary"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   {password && (
//                     <IconButton onClick={handleClickShowPassword} disableRipple edge="end">
//                       {showPassword ? <VisibilityOff sx={{ fontSize: '15px' }} /> : <Visibility sx={{ fontSize: '15px' }} />}
//                     </IconButton>
//                   )}
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               '& .MuiInputBase-input': { fontSize: '15px' },
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: 'lightgray',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#9e1a88',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#9e1a88',
//                 },
//               },
//               '& .MuiInputLabel-root.Mui-focused': {
//                 color: '#9e1a88',
//               },
//               '& .MuiFormHelperText-root': {
//                 fontSize: '10px',
//                 my: '0px',
//               },
//             }}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{ backgroundColor: '#9e1a88', '&:hover': { backgroundColor: '#7e146a' } }}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Submit'}
//           </Button>
//           <Typography variant="subtitle2" sx={{ fontSize: '13px', cursor: 'pointer', fontWeight: 400, textAlign: 'end' }}>
//             Forget Password ?
//           </Typography>
//           <Typography variant="subtitle2" sx={{ fontSize: '13px', textAlign: 'center' }}>
//             Don&apos;t have an account? 
//             <Link to="/register" style={{ color: '#9e1a88' }}> Sign Up</Link>
//           </Typography>
//         </Stack>
//       </FormControl>
//     </Paper>
//   );
// };

// export default LoginForm;
