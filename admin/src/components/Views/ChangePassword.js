import axios from 'axios'
import React, { useState } from 'react'
import {
  AnimationType,
  DialogType,
  OutAnimationType,
  PopupActions,
  ToastPosition,
  usePopup
} from 'react-custom-popup'
import { FaKey } from 'react-icons/fa'
import { FaWindowClose } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { handleResetAuthedUser } from '../../actions/authedUser'
import { Loading, loadingTimer } from '../Helper/Loading'
import { removeClass, updateClass } from '../Helper/UpdateStatus'

// import { handleResetAuthedUser } from '../../actions/authedUser'
const api = 'http://localhost:5000/rangers/auth/changePassword'
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { showAlert } = usePopup()
  const authedUser = useSelector(({ authedUser }) => (authedUser ? authedUser : null))
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return showAlert({
        type: DialogType.DANGER,
        text: 'Make Sure that new password is smilier to the confirm password',
        title: 'Password Are Not The Same',
        animationType: AnimationType.FADE_IN,
        outAnimationType: OutAnimationType.FADE_OUT,
        confirmText: 'OK'
      })
    }
    setLoading(true)
    try {
      await axios({
        method: 'put',
        url: api,
        headers: { authorization: 'Bearer ' + authedUser.token },
        data: {
          oldPassword: oldPassword,
          newPassword: password,
          nationality_id: authedUser.nationality_id
        }
      }).then((response) => {
        Promise.all([loadingTimer(2500)]).then(() => {
          if (response.status === 200) {
            showAlert({
              type: DialogType.SUCCESS,
              text: 'You are now signed out, You will need to login again',
              title: 'Password Has Been Changed',
              allowOutsideClick: false,
              animationType: AnimationType.FADE_IN,
              outAnimationType: OutAnimationType.FADE_OUT,
              confirmText: 'Got it!'
            })
            dispatch(handleResetAuthedUser())
          } else {
            PopupActions.showToast({
              text: `Couldn't Change Password!`,
              type: DialogType.DANGER,
              position: ToastPosition.BOTTOM_RIGHT,
              timeoutDuration: 5000
            })
          }
          setLoading(false)
        })
      })
    } catch (err) {
      Promise.all([loadingTimer(2000)]).then(() => {
        PopupActions.showToast({
          text: `Something Went Wrong, Try Again! ${err}`,
          type: DialogType.WARNING,
          position: ToastPosition.BOTTOM_RIGHT,
          timeoutDuration: 5000
        })
        setLoading(false)
      })
    }
  }
  if (loading === true) {
    return <Loading type={'bars'} color={'white'} />
  }
  return (
    <form
      className="rangerPage animate__animated animate__slideInUp animate__faster"
      onSubmit={(e) => handleSubmit(e)}
    >
      <FaWindowClose
        size={50}
        fill="red"
        style={{ float: 'left', cursor: 'pointer', margin: '5px' }}
        onClick={() => PopupActions.hideModal()}
      />
      <div className="containerRanger">
        <div className="fromHeader">
          <h1>Change Password</h1>
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <div className="input-icon" id="firstName">
            <FaKey className="icon" fill="black" size={36} />
          </div>
          <input
            type={'password'}
            placeholder="Password"
            id="Password"
            className="no-arrow"
            onClick={(e) => updateClass(e)}
            onBlur={(e) => removeClass(e)}
            autoComplete="off"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <div className="input-icon" id="firstName">
            <FaKey className="icon" fill="black" size={36} />
          </div>
          <input
            type={'password'}
            placeholder="New Password"
            id="New-Password"
            className="no-arrow"
            onClick={(e) => updateClass(e)}
            onBlur={(e) => removeClass(e)}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <div className="input-icon" id="firstName">
            <FaKey className="icon" fill="black" size={36} />
          </div>
          <input
            type={'password'}
            placeholder="Confirm New Password"
            id="Confirm-New-Password"
            className="no-arrow"
            onClick={(e) => updateClass(e)}
            onBlur={(e) => removeClass(e)}
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <button type="submit" className="submitButton">
            Change Password{' '}
          </button>
        </div>
      </div>
    </form>
  )
}
export default ChangePassword