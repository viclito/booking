import { Box, Button, IconButton, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import hamburger from '../assets/more.png'
import { Bedsvg, Flightsvg, Homesvg, Usersvg } from '../utils/logos'
import { useState } from 'react'
import { useAuth } from '../utils/AuthContext'

const Navbar = ({children}) => {
    const {pathname} = useLocation()
    const [menuToggle , setMenuToggle] =useState(true)
    const { currentUser, logout } = useAuth();
  return (
    <div>
        <Box sx={{ display: "flex",flexDirection:'column', position: 'relative', height: '100vh' }}>
            <Box sx={{ top: "0", left: 0 , display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                <Box sx={{display:'flex'  , alignItems:'center'}}>
                    <IconButton disableRipple  sx={{padding:3 , py:2.4 }} onClick={()=>setMenuToggle(!menuToggle)}>
                        <img src={hamburger} alt="" style={{height:'20px'}}/>
                    </IconButton>
                    <Typography variant='subtitle2' sx={{fontWeight: '600' , fontSize:'18px' , color:'black', width:'100px', textAlign:'start' }}>Logo</Typography>
                </Box>
                
                <Box sx={{mr:2 , display:'flex' ,gap:2 , alignItems:'center'}}>
                    {currentUser && <Box sx={{display:'flex' , gap:.6 ,alignItems:'center'}}>
                        <Typography sx={{width:'20px' , height:'20px' , borderRadius:20 , backgroundColor:'#18a5e2' , display:'flex' , alignItems:'center' , justifyContent:'center' , fontSize:'12px' , fontweight:800 , color:'white'}}>{currentUser.username[0]}</Typography>
                        <Typography variant='subtitle2' sx={{fontWeight: '600' , fontSize:'14px' , color:'black', textAlign:'start' }}>{currentUser.username}</Typography>
                    </Box>}
                    <Button onClick={()=>logout()} variant='contained' size='small' sx={{ bgcolor:' #18a5e2' ,'&:hover': {bgcolor: '#2abeff'}}}>LogOut</Button>
                </Box>
            </Box>
            <Box sx={{display:'flex', height:'100%' }}>
                <Box sx={{ flexShrink: 0,height:{md:'100%'}, bgcolor: 'white',p:.8 ,display:'flex',width:{xs:'100%', md:'auto'}, flexDirection:{md:'column'} , alignItems:'start', justifyContent:{xs:'space-evenly' , md:'flex-start'} , boxShadow:'1px 1px 2px #e9e9e9', position:{md:'relative' , xs:'fixed'} , bottom:0}}>
                    <Box sx={{paddingBottom:{md:'50px'}, paddingTop:{md:'10px'}, display:{md:'block' , xs:'none'}}}>
                        
                    </Box>
                    <Link to='/' style={{backgroundColor: pathname === '/' ? '#e8f8ff' : '' , borderRadius:'5px'}}>
                        <IconButton disableRipple  sx={{paddingLeft:1.2  , paddingRight:1.2 , display:'flex' , alignItems:'center' ,  gap:2}}>
                            <Homesvg color='#000000'/>
                            <Typography variant='subtitle2' sx={{fontWeight:pathname === '/' ? '600' : '' , color:'black', width:'100px', textAlign:'start' , display:{ md: menuToggle ? 'block' : 'none', xs: 'none' }}}>Home</Typography>
                        </IconButton>
                    </Link>
                    <Link to='/flight' style={{backgroundColor: pathname === '/flight' ? '#e8f8ff' : '', borderRadius:'5px'}}>
                        <IconButton disableRipple  sx={{paddingLeft:1.2  , paddingRight:1.2 , display:'flex' , alignItems:'center' ,  gap:2}}>
                            <Flightsvg color='#000000'/>
                            <Typography variant='subtitle2' sx={{fontWeight:pathname === '/flight' ? '600' : '' , color:'black', width:'100px', textAlign:'start',display:{ md: menuToggle ? 'block' : 'none', xs: 'none' }}}>Flight</Typography>
                        </IconButton>
                    </Link>
                    <Link to='/stay' style={{backgroundColor: pathname === '/stay' ? '#e8f8ff' : '', borderRadius:'5px'}}>
                        <IconButton disableRipple  sx={{paddingLeft:1.2  , paddingRight:1.2 , display:'flex' , alignItems:'center' ,  gap:2}}>
                            <Bedsvg color='#000000'/>
                            <Typography variant='subtitle2' sx={{fontWeight:pathname === '/stay' ? '600' : '' , color:'black' , width:'100px', textAlign:'start', display:{ md: menuToggle ? 'block' : 'none', xs: 'none' }}}>Stay</Typography>
                        </IconButton>
                    </Link>
                    <Link to='/profile' style={{backgroundColor: pathname === '/profile' ? '#e8f8ff' : '', borderRadius:'5px'}}>
                        <IconButton disableRipple  sx={{paddingLeft:1.2 , paddingRight:1.2 , display:'flex' , alignItems:'center' ,  gap:2}}>
                            <Usersvg color='#000000'/>
                            <Typography variant='subtitle2' sx={{fontWeight:pathname === '/profile' ? '600' : '' , color:'black', width:'100px', textAlign:'start', display:{ md: menuToggle ? 'block' : 'none', xs: 'none' }}}>Profile</Typography>
                        </IconButton>
                    </Link>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    {/* <Box sx={{ position: "sticky", top: "0", left: 0 }}>
                        <Box sx={{ p: 2 }}>
                        Header
                        </Box>
                    </Box> */}
                    <Box sx={{overflowY:'auto', flexGrow: 1 }}>
                        {/* Main Content Goes Here */}
                        {children}
                    </Box>
                </Box>
            </Box>
      </Box>
    </div>
  )
}

export default Navbar