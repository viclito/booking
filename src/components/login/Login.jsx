import './login.scss'
import bgimg from '../../assets/login.jpg'
// import cloud from '../../assets/cloud.png'
import LoginForm from './LoginForm'


const Login = () => {


  return (
    <div className='login'>
        
        <div className="inner">
            <div className="left">
              
              <div className="details">
                <h2>...we preach, warning every man, and teaching every man in all wisdom; that we may present every man perfect in Christ Jesus</h2>
                <h5>Col 1:28</h5>
              </div>
            
              <div className="bgimg">
                <img src={bgimg} alt="" />
              </div>
            </div> 
            <div className="right">
              <LoginForm/>
            </div>

        </div>
    </div>
  )
}

export default Login