import {  Button, FormControl,  FormLabel,  Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {

    const [name , setName] = useState('')
    const [password , setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {name , password }
        console.log(data);
    }
  return (
    <Paper sx={{p:2 , width:'340px',bgcolor:'transparent'}}>
        <FormControl component="form"  sx={{width:'100%' }} onSubmit={handleSubmit}>
            <FormLabel sx={{textAlign:'center' , fontSize:'25px' , fontWeight:600 , p:2, color:'#048ec5'}}>Flight LOGIN</FormLabel>
            <Stack spacing={2} sx={{ display:'flex' , flexDirection:'column' , gap:{xs:'15px' , sm:'15px' , md:'2px'}}}>

            <TextField label='UserName' size='small' helperText=''
                value={name}
                onChange={(e)=>setName(e.target.value)}
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

            <Typography variant='subtitle2' sx={{fontSize:'13px' , cursor:'pointer' , fontWeight:400 , textAlign:'end' }}>Forget Password ?</Typography>

            <Typography variant='subtitle2' sx={{fontSize:'13px' , textAlign:'center' }}>Don&apos;t have an account? 
                <Link to="/register" style={{color:'#048ec5'}}> Sign Up</Link>
            </Typography>
            </Stack>
        </FormControl>
    </Paper>
  )
}

export default LoginForm