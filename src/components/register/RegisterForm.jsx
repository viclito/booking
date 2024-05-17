import {  Button, FormControl,  FormLabel,  Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = () => {

    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [number , setNumber] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {name , password , email , number}
        console.log(data);
    }
  return (
    <Paper sx={{p:2 , width:'340px' , bgcolor:'transparent'}}>
        <FormControl component="form"  sx={{width:'100%'}} onSubmit={handleSubmit}>
            <FormLabel sx={{textAlign:'center' , fontSize:'25px' , fontWeight:600 , p:2, color:'#048ec5'}}>Flight Registration</FormLabel>
            <Stack spacing={2} sx={{ display:'flex' , flexDirection:'column' , gap:{xs:'15px' , sm:'15px' , md:'2px'}}}>

            <TextField label='UserName' size='small' helperText=''
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                color="primary"
                  sx={{'& .MuiInputBase-input':{fontSize:'15px'}}}
            />

            <TextField label='E-mail' size='small' helperText=''
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                color="primary"
                  sx={{'& .MuiInputBase-input':{fontSize:'15px'}}}
            />
            <TextField label='Phone Number' size='small' helperText=''
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                required
                color="primary"
                  sx={{'& .MuiInputBase-input':{fontSize:'15px'}}}
            />

            <TextField label='Password' size='small' helperText=''
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                color="primary"
                sx={{'& .MuiInputBase-input':{fontSize:'15px'}}}
            />
            <Button type='submit' variant='contained'>Submit</Button>

            <Typography variant='subtitle2' sx={{fontSize:'13px' , textAlign:'center' }}>You already have an account? 
                <Link to="/login" style={{color:'#048ec5'}}> Login</Link>
            </Typography>
            </Stack>
        </FormControl>
    </Paper>
  )
}

export default RegisterForm