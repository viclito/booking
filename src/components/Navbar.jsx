import { Box, Button, IconButton, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import hamburger from '../assets/more.png'
import logo from '../assets/logo.jpg'
import { Bedsvg,  Homesvg, Notificationsvg, Usersvg } from '../utils/logos'
import { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { motion, AnimatePresence } from 'framer-motion';
import userimg from '../assets/user.png'

const Navbar = ({children}) => {
    const {pathname} = useLocation()
    const [menuToggle , setMenuToggle] =useState(true)
    const [userToggle , setUserToggle] = useState(false)

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    const { currentUser, logout } = useAuth();
  return (
    <div>
        <Box sx={{ display: "flex",flexDirection:'column', position: 'relative', height: '100vh' }}>
            <Box sx={{ top: "0", left: 0 , display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
                <Box sx={{display:'flex'  , alignItems:'center'}}>
                    <IconButton disableRipple  sx={{padding:3 , py:2.4 }} onClick={()=>setMenuToggle(!menuToggle)}>
                        <img src={hamburger} alt="" style={{height:'20px'}}/>
                    </IconButton>
                    <img src={logo} alt="" style={{height:'40px'}}/>
                </Box>
                
                <Box sx={{ position:'relative'}}>
                    <Box sx={{mr:5 , display:'flex' ,gap:2 , alignItems:'center'}}>
                        <Notificationsvg notifynum={1} />
                        <IconButton disableRipple onClick={()=>setUserToggle(!userToggle)}>
                            <img src={userimg} alt="" style={{height:'25px' , width:'auto'}}/>
                        </IconButton>
                    </Box>
                    <Box sx={{position:'absolute', display:!userToggle?'none':'flex' , flexDirection:'column' , gap:1 , top:'50px' , right:'30px' , padding:1.5 , pr:4 , borderRadius:'5px' , boxShadow:'1px 1px 2px #ccc ,-1px -1px 2px #ccc '}}>
                        {currentUser && <Box sx={{display:'flex' , gap:.6 ,alignItems:'center'}}>
                            <Typography sx={{width:'20px' , height:'20px' , borderRadius:20 , backgroundColor:'#9e1a88' , display:'flex' , alignItems:'center' , justifyContent:'center' , fontSize:'12px' , fontweight:800 , color:'white'}}>{capitalizeFirstLetter(currentUser.username[0])}</Typography>
                            <Typography variant='subtitle2' sx={{fontWeight: '600' , fontSize:'14px' , color:'black', textAlign:'start' }}>{capitalizeFirstLetter(currentUser.username)}</Typography>
                        </Box>}
                        <Link to='/profile'>
                            <Typography variant='subtitle2' sx={{pl:.8 }}>PROFILE</Typography>
                        </Link>
                        <Button onClick={()=>logout()} variant='text' size='small' sx={{ color:' #9e1a88' , fontWeight:700 ,'&:hover': {color: '#7e146a'}}}>LogOut</Button>
                    </Box>
                    
                </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ flexShrink: 0, height: { md: '100%' }, bgcolor: 'white', p: .8, display: 'flex', width: { xs: '100%', md: 'auto' }, flexDirection: { md: 'column' }, alignItems: 'start', justifyContent: { xs: 'space-evenly', md: 'flex-start' }, boxShadow: '1px 1px 2px #e9e9e9', position: { md: 'relative', xs: 'fixed' }, bottom: 0 }}>
                <Box sx={{ paddingBottom: { md: '50px' }, paddingTop: { md: '10px' }, display: { md: 'block', xs: 'none' } }}>
                </Box>
                <Link to='/dashboard' style={{ backgroundColor: pathname === '/dashboard' ? '#fbe9f8' : '', borderRadius: '5px' }}>
                    <IconButton disableRipple sx={{ paddingLeft: 1.2, paddingRight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Homesvg color='#000000' />
                    <AnimatePresence>
                        {menuToggle && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: '100px' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                            variant='subtitle2'
                            sx={{
                                fontWeight: pathname === '/dashboard' ? '600' : '',
                                color: 'black',
                                textAlign: 'start',
                                display: { md: 'block', xs: 'none' }
                            }}
                            >
                            Dashboard
                            </Typography>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </IconButton>
                </Link>
                {/* <Link to='/flight' style={{ backgroundColor: pathname === '/flight' ? '#fbe9f8' : '', borderRadius: '5px' }}>
                    <IconButton disableRipple sx={{ paddingLeft: 1.2, paddingRight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Flightsvg color='#000000' />
                    <AnimatePresence>
                        {menuToggle && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: '100px' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                            variant='subtitle2'
                            sx={{
                                fontWeight: pathname === '/flight' ? '600' : '',
                                color: 'black',
                                textAlign: 'start',
                                display: { md: 'block', xs: 'none' }
                            }}
                            >
                            Flight
                            </Typography>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </IconButton>
                </Link> */}
                <Link to='/stay' style={{ backgroundColor: pathname === '/stay' ? '#fbe9f8' : '', borderRadius: '5px' }}>
                    <IconButton disableRipple sx={{ paddingLeft: 1.2, paddingRight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Bedsvg color='#000000' />
                    <AnimatePresence>
                        {menuToggle && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: '100px' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                            variant='subtitle2'
                            sx={{
                                fontWeight: pathname === '/stay' ? '600' : '',
                                color: 'black',
                                textAlign: 'start',
                                display: { md: 'block', xs: 'none' }
                            }}
                            >
                            Stay
                            </Typography>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </IconButton>
                </Link>
                <Link to='/profile' style={{ backgroundColor: pathname === '/profile' ? '#fbe9f8' : '', borderRadius: '5px' }}>
                    <IconButton disableRipple sx={{ paddingLeft: 1.2, paddingRight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Usersvg color='#000000' />
                    <AnimatePresence>
                        {menuToggle && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: '100px' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                            variant='subtitle2'
                            sx={{
                                fontWeight: pathname === '/profile' ? '600' : '',
                                color: 'black',
                                textAlign: 'start',
                                display: { md: 'block', xs: 'none' }
                            }}
                            >
                            Profile
                            </Typography>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </IconButton>
                </Link>
                {/* <Link to='/profile' style={{ backgroundColor: pathname === '/profile' ? '#fbe9f8' : '', borderRadius: '5px' }}>
                    <IconButton disableRipple sx={{ paddingLeft: 1.2, paddingRight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Notificationsvg notifynum={1} />
                    <AnimatePresence>
                        {menuToggle && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: '100px' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography
                            variant='subtitle2'
                            sx={{
                                fontWeight: pathname === '/profile' ? '600' : '',
                                color: 'black',
                                textAlign: 'start',
                                display: { md: 'block', xs: 'none' }
                            }}
                            >
                            Profile
                            </Typography>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </IconButton>
                </Link> */}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                        {children}
                    </Box>
                </Box>
            </Box>
      </Box>
    </div>
  )
}

export default Navbar