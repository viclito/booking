import { Box, Button, FormControl, FormLabel, InputAdornment, MenuItem, TextField, Typography } from "@mui/material"
import Navbar from "../../Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
// import axiosInstance from "../../../utils/axiosInstance";

const Profile = () => {


  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [centers, setCenters] = useState([]);
  const [selectedCenterId, setSelectedCenterId] = useState('');
  const [local, setLocal] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    dob: null,
    gender: '',
    countryId: '',
    centerId: '',
    localId: '',
    assemblyName: '',
    ministerInCharge: ''
  });
  
  useEffect(() => {
    const localStoredToken = localStorage.getItem('token');
    const localStoredEmail = localStorage.getItem('email');
    if (localStoredToken) {
      setToken(JSON.parse(localStoredToken));
    }
    if (localStoredEmail) {
      setEmail(localStoredEmail);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://103.104.48.5:8282/api/v1/center', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setCenters(response.data.data); // Assuming response.data contains the list of centers
        console.log(centers);
      } catch (err) {
        setError('Failed to fetch centers');
        console.error('Fetch centers error:', err);
      }
    };

    fetchCenters();
  }, [token]);

  useEffect(() => {
    if (!selectedCenterId) return;

    const fetchLocalData = async () => {
      try {
        const response = await axios.get(`http://103.104.48.5:8282/api/v1/center/${selectedCenterId}/local`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setLocal(response.data.data); // Update localData state with response
      } catch (err) {
        setError('Failed to fetch local data');
        console.error('Fetch local data error:', err);
      }
    };

    fetchLocalData();
  }, [selectedCenterId, token]);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://103.104.48.5:8282/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = response.data.recordInfo;
        localStorage.setItem('profile', JSON.stringify(profileData));
        setProfile(profileData);
        const { firstName , lastName, mobileNumber, dob, gender, countryId, centerId, localId, assemblyName, ministerInCharge } = profileData;
        setFormData({
          firstName: firstName || '',
          lastName: lastName || '',
          mobileNumber: mobileNumber || '',
          dob: dob || null,
          gender: gender || '',
          countryId: countryId || '',
          centerId: centerId || '',
          localId: localId || '',
          assemblyName: assemblyName || '',
          ministerInCharge: ministerInCharge || ''
        });
         // Set initial form data
      } catch (err) {
        setError('Failed to fetch profile');
        console.error('Fetch profile error:', err);
      }
    };

    fetchProfile();
  }, [token]);

  const updateProfile = async (profileData) => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      await axios.post('http://103.104.48.5:8282/api/v1/user/profile/update', profileData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Updating profile data failed:', error.response ? error.response.data : error.message);
      setError('Failed to update profile.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'centerId') {
      setSelectedCenterId(value);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleDateChange = (newValue) => {
    // Format the date as needed, e.g., 'YYYY-MM-DD'
    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
  
    // Update your formData with the formatted date string
    setFormData((prevFormData) => ({
      ...prevFormData,
      dob: formattedDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };
  console.log('form data', formData);

  

  return (
    <Navbar>
        <Box sx={{maxWidth:'1300px' , margin:'auto' , p:2}}>
          {/* <Typography variant="h5" sx={{textAlign:"center" , fontWeight:700}}>Profile</Typography> */}
          <Box sx={{display:"flex" , gap:2 , alignItems:"center" , justifyContent:"space-evenly" , margin:'auto' , maxWidth:'600px'}}>
            <Box sx={{height:'120px' , width:'120px' , borderRadius:'50%' , overflow:'hidden' , backgroundColor:'black'}}>
              <img src="" alt="" style={{width:'100%' , height:'100%'}}/>
            </Box>
            <Box>
              <Box sx={{display:'flex' , gap:'20px' , alignItems:'center'}}>
                <Typography variant="h6" sx={{fontWeight:600 , fontSize:'17px'}}>
                  {profile.firstName} {profile.lastName}
                </Typography>
                {/* <Button variant="contained" sx={{ backgroundColor: '#9e1a88' , fontSize:'14px', '&:hover': { backgroundColor: '#7e146a' } }}>
                  Update Profile
                </Button> */}
                <Typography variant="h6" sx={{fontSize:'13px', color:'#9e1a88' , fontWeight:'600'}}>Please Complete Your Profile</Typography>
              </Box>
              
              <Typography variant="h6" sx={{fontWeight:600 , fontSize:'13px'}}>
                Number :{profile.mobileNumber}
              </Typography>
              <Typography variant="h6" sx={{fontWeight:600 , fontSize:'13px'}}>
                Email :{email}
              </Typography>
            </Box>
          </Box>



          <Box sx={{marginTop:'50px'}}>
            <FormControl component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
                <Box sx={{ display:'flex' , flexWrap:'wrap' ,alignItems:'center' , gap:'20px' , justifyContent:'center'}}>
                  <Box sx={{display:'flex' , flexDirection:"column" , height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>FirstName</FormLabel>
                    <TextField
                    name="firstName"
                    size="small"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    // error={!!fNameError}
                    // helperText={fNameError}
                    color="primary"
                    sx={{
                        '& .MuiInputBase-input': {
                        fontSize: '15px',width:'300px'
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
                  </Box>
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Last Name</FormLabel>
                    <TextField
                    name="lastName"
                    size="small"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    // error={!!fNameError}
                    // helperText={fNameError}
                    color="primary"
                    sx={{
                        '& .MuiInputBase-input': {
                        fontSize: '15px',width:'300px'
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
                  </Box>
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Mobile Number</FormLabel>
                    <TextField
                    name="mobileNumber"
                    size="small"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    // error={!!fNameError}
                    // helperText={fNameError}
                    color="primary"
                    sx={{
                        '& .MuiInputBase-input': {
                        fontSize: '15px',width:'300px'
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
                  </Box>
                  
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Date of Birth</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="dob"
                        value={dayjs(formData.dob)}
                        onChange={handleDateChange}
                        size="small"
                        sx={{
                          '& .MuiInputBase-input': {
                          fontSize: '15px',width:'260px',padding:'10px'
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
                    </LocalizationProvider>
                  </Box>





                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Gender</FormLabel>
                    <TextField
                        name="gender"
                        select
                        size="small"
                        value={formData.gender}
                        onChange={handleChange}
                        
                        required
                        type='text'
                        color="primary"
                        
                        sx={{
                        '& .MuiInputBase-input': { fontSize: '14px' , width:'280px'},
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
                    >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                    </TextField>
                  </Box>
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Country</FormLabel>
                    <TextField
                        name="countryId"
                        select
                        size="small"
                        value={formData.countryId}
                        onChange={handleChange}
                        
                        required
                        type='text'
                        color="primary"
                        
                        sx={{
                        '& .MuiInputBase-input': { fontSize: '14px' , width:'280px'},
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
                    >
                        <MenuItem value='IN'>India</MenuItem>
                        <MenuItem value='SL'>Sri Lanka</MenuItem>
                        <MenuItem value='PAK'>Pakisthan</MenuItem>
                        <MenuItem value='UK'>England</MenuItem>
                    </TextField>
                  </Box>
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Center</FormLabel>
                    <TextField
                        name="centerId"
                        select
                        size="small"
                        value={formData.centerId}
                        onChange={handleChange}
                        
                        required
                        type='text'
                        color="primary"
                        
                        sx={{
                        '& .MuiInputBase-input': { fontSize: '14px' , width:'280px'},
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
                    >
                      {/* <MenuItem value="" disabled>Select Center</MenuItem> */}
                      {centers && centers.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Local</FormLabel>
                    <TextField
                        name="localId"
                        select
                        size="small"
                        value={formData.localId}
                        onChange={handleChange}
                        
                        required
                        type='text'
                        color="primary"
                        
                        sx={{
                        '& .MuiInputBase-input': { fontSize: '14px' , width:'280px'},
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
                    >
                      {/* <MenuItem value="" disabled>Select Center</MenuItem> */}
                      {local && local.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>Assembly Name</FormLabel>
                    <TextField
                    name="assemblyName"
                    size="small"
                    value={formData.assemblyName}
                    onChange={handleChange}
                    required
                    // error={!!fNameError}
                    // helperText={fNameError}
                    color="primary"
                    sx={{
                        '& .MuiInputBase-input': {
                        fontSize: '15px',width:'300px'
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
                  </Box>
                  <Box sx={{display:'flex' , flexDirection:"column" ,height:'70px'}}>
                    <FormLabel sx={{fontSize:"13px"}}>minister In Charge</FormLabel>
                    <TextField
                    name="ministerInCharge"
                    size="small"
                    value={formData.ministerInCharge}
                    onChange={handleChange}
                    required
                    // error={!!fNameError}
                    // helperText={fNameError}
                    color="primary"
                    sx={{
                        '& .MuiInputBase-input': {
                        fontSize: '15px',width:'300px'
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
                  </Box>

                </Box>
                <Box sx={{display:'flex' , justifyContent:'center' , marginTop :'20px'}}>
                  <Button type="submit" variant="contained" sx={{ backgroundColor: '#9e1a88' , width:'200px', '&:hover': { backgroundColor: '#7e146a' } }}>
                      Submit
                  </Button>
                </Box>
                    
            </FormControl>
          </Box>
        </Box>
    </Navbar>
  )
}

export default Profile