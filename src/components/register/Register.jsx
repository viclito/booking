import bgimg from '../../assets/plane.png'
import cloud from '../../assets/cloud.png'
import './register.scss'
import RegisterForm from './RegisterForm'


const Register = () => {
  return (
    <div className='register'>
      <div className="inner">
            <div className="left">
              <div className="bgimg">
                <img src={bgimg} alt="" />
              </div>
              <img className='cloud' src={cloud} alt="" />
              <img className='cloud2' src={cloud} alt="" />
              <img className='cloud3' src={cloud} alt="" />
              <img className='cloud4' src={cloud} alt="" />
              <h1>Book Your Tickets</h1>
              <div className="details">
                <h2>Company Name</h2>
                <h6>Company slogan or Quotes</h6>
              </div>
            </div>
            <div className="right">
              <RegisterForm/>
            </div>

        </div>
    </div>
  )
}

export default Register