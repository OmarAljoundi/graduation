import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'
import logo from '../icons/logo.png'
import '../style/login.scss'
import { Loading, loadingTimer } from './Helper/Loading'

const api = 'http://localhost:5000/rangers/auth'
const CreatePassword = () => {
  const [loading, setLoading] = useState(false)
  const isUserLogedin = useSelector(({ authedUser }) => (authedUser ? authedUser.signin : false))
  const location = useLocation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    document.body.classList.add('login')
    return () => {
      document.body.classList.remove('login')
    }
  }, [])

  if (!location || isUserLogedin === true) {
    return <Navigate to="/" />
  }
  const nationality_id = location.state.nationality_id

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (password !== confirmPassword) {
      setLoading(false)
      return PopupActions.showToast({
            text: `Passwords Miss Match!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
    }
    try {
      const response = await axios.put(api, { nationality_id, password })
      Promise.all([loadingTimer(1500)]).then(()=>{
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
          setLoading(false)
      })
    
      
    } catch (error) {
       Promise.all([loadingTimer(1500)]).then(() => {
        if(!error?.response){
          PopupActions.showToast({
            text: `No Server Response!`,
            type: DialogType.ERROR,
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
            type: DialogType.ERROR,
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

  if (isUserLogedin) {
    return <Navigate to="/" />
  }

  return (
    <div className="site-wrapper">
      {loading === true && (<Loading type={'bubbles'} color={'red'} styleClass="sign-spin"/>)}
      <form className="login-form" onSubmit={(e) => handlePasswordUpdate(e)}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ color: 'white' }}>Create Password</h1>
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
            name="passowrd"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
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
            id="confirmPassword"
            className="lf--input"
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <input className="lf--submit" type="submit" value="UPDATE PASSWORD" />
      </form>
    </div>
  )
}
export default CreatePassword
