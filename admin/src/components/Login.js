import React, { useState, useEffect } from 'react'
import '../style/login.scss'
import logo from '../icons/logo.png'
import axios from 'axios'
import { Loading, loadingTimer } from './Helper/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { useNavigate, Navigate } from 'react-router'
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup'
import { Link } from 'react-router-dom'
const api = 'http://localhost:5000/rangers/auth'

function Login() {
  const [loading, setLoading] = useState(false)
  const [nationality_id, setNationality_id] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    document.body.classList.add('login')
    return () => {
      document.body.classList.remove('login')
    }
  }, [])

  const isUserLogedin = useSelector(({ authedUser }) => (authedUser ? authedUser.signin : false))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(api,{ nationality_id, password })
      Promise.all([loadingTimer(1500)]).then(()=>{
        if(response.status == 204){
           PopupActions.showToast({
            text: "You have entered a wrong credantional!",
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
        }
         else if (response.data.info.firsttime === false) {
          dispatch(handleSetAuthedUser(response.data.info, response.headers.authorization))
          PopupActions.showToast({
            text: `Logged In Successfully!`,
            type: DialogType.SUCCESS,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
        } else {
          PopupActions.showToast({
            text: `Set Up A New Password For Your Account`,
            type: DialogType.INFO,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
          return navigate('/createpassword', { state: response.data.info })
        }
        setLoading(false)
      })
        
       
      }
      catch (error) {
        Promise.all([loadingTimer(1500)]).then(() => {
        if(!error?.response){
          PopupActions.showToast({
            text: `No Server Response!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
      }
      else {
         PopupActions.showToast({
            text: `Login Faild!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
      }
        setLoading(false)
      })
      
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setNationality_id(e.target.value)
  }
  if (isUserLogedin === true) {
    return <Navigate to="/" />
  }
  return (
    <div className="site-wrapper">
      {loading === true && (<Loading type={'bubbles'} color={'red'} styleClass="sign-spin"/>)}
      <form className={loading == true ? 'login-form hideLogin' : 'login-form'} onSubmit={(e) => handleSubmit(e)}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ color: 'black', fontSize: '4rem' }}>Sign In </h1>
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="username">
            <svg x="0px" y="0px" width="12px" height="13px">
              <path
                fill="#B1B7C4"
                d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
              />
            </svg>
          </label>
          <input
            id="username"
            className="lf--input no-arrow"
            name="phone"
            type="text"
            placeholder="Nationality ID"
            maxLength={10}
            value={nationality_id}
            onChange={(e) => isNaN(e.target.value) ? null : handlePhoneChange(e)}
            required
          />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="password">
            <svg x="0px" y="0px" width="15px" height="5px">
              <g>
                <path
                  fill="#B1B7C4"
                  d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                />
              </g>
            </svg>
          </label>
          <input
            id="password"
            className="lf--input"
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => handlePasswordChange(e)}
          />
        </div>
        <input className="lf--submit" type="submit" value="LOGIN" />
        <div id="forget-password">
        <span>Forget Your Password? <Link to="/forget-password">Reset Password</Link></span>
        </div>
      </form>
      
    </div>
    

  )
}

export default Login
