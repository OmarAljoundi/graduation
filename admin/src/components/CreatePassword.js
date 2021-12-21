import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'
import logo from '../icons/logo.png'
import '../style/login.scss'

const api = 'http://localhost:5000/rangers/auth'
const CreatePassword = () => {
  const isUserLogedin = useSelector(({ authedUser }) => (authedUser ? authedUser.signin : false))
  const location = useLocation()
  if (!location || isUserLogedin === true) {
    return <Navigate to="/" />
  }

  const nationality_id = location.state.nationality_id
  const alert = useAlert()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('component mounted!')

    document.body.classList.add('login')
    return () => {
      console.log('component will unmount')
      document.body.classList.remove('login')
    }
  }, [])

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log(password)
      console.log(confirmPassword)
      alert.error('Passwords are not the same!')
    }
    try {
      const response = await axios.put(api, { nationality_id, password })
      dispatch(handleSetAuthedUser(response.data.info, response.headers.authorization))
      return <Navigate to="/" />
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="site-wrapper">
      <form className="login-form" onSubmit={(e) => handlePasswordUpdate(e)}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" />
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
            maxLength="11"
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
