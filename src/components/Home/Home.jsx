import React from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
  return (
    <div className='home'>
        <Link to='login'>Go to Login Page</Link>
    </div>
  )
}

export default Home