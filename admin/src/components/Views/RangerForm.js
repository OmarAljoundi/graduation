import React, { useState } from 'react'
import '../../style/Form.css'
import '../../style/login.scss'
import Select from 'react-select'
import { FaUserCircle, FaEnvelope, FaIdCard, FaWindowClose, FaPhoneAlt } from 'react-icons/fa'
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Loading, loadingTimer } from '../Helper/Loading'
import { removeClass, updateClass } from '../Helper/UpdateStatus'
const api = 'http://localhost:5000/rangers/register'
const RangerForm = () => {
  const token = useSelector(({ authedUser }) => (authedUser ? authedUser.token : null))
  const options = [
    { value: 'Read / Execute / Create', label: 'Read / Execute / Create' },
    { value: 'Read / Execute', label: 'Read / Execute' },
    { value: 'Read', label: 'Read' }
  ]
  const [type, setType] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [natId, setNatId] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios({
        method: 'post',
        url: api,
        headers: { authorization: 'Bearer ' + token },
        data: {
          name: first + ' ' + last,
          email: email,
          phone_number: phone_number,
          nationality_id: natId,
          role: type['value']
        }
      }).then((response) => {
        Promise.all([loadingTimer(2500)]).then(() => {
          if (response.status === 201) {
            PopupActions.hideModal()
            PopupActions.showToast({
              text: `Account Has Been Create For ${first + ' ' + last}`,
              type: DialogType.SUCCESS,
              position: ToastPosition.BOTTOM_RIGHT,
              timeoutDuration: 5000
            })
          } else {
            PopupActions.showToast({
              text: `Something Went Wrong, Try Again!`,
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
          <h1>Add New Ranger</h1>
        </div>

        <div className="NameContainer">
          <div className="input-container">
            <div className="input-icon" id="firstName">
              <FaUserCircle className="icon" fill="black" size={36} />
            </div>
            <input
            disabled="true"
              type={'text'}
              placeholder="First Name"
              id="first"
              onClick={(e) => updateClass(e)}
              onBlur={(e) => removeClass(e)}
              autoComplete="off"
              onChange={(e) => setFirst(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <div className="input-icon" id="lastName">
              <FaUserCircle className="icon" fill="black" size={36} />
            </div>
            <input
              type={'text'}
              placeholder="Last Name"
              id="last"
              onClick={(e) => updateClass(e)}
              onBlur={(e) => removeClass(e)}
              autoComplete="off"
              onChange={(e) => setLast(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <div className="input-icon" id="emailAddress">
            <FaEnvelope className="icon" fill="black" size={36} />
          </div>
          <input
            type={'text'}
            placeholder="E-Mail"
            id="email"
            onClick={(e) => updateClass(e)}
            onBlur={(e) => removeClass(e)}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <div className="input-icon" id="natId">
            <FaIdCard className="icon" fill="black" size={36} />
          </div>
          <input
            type={'number'}
            placeholder="Nationality ID"
            id="Nationality"
            className="no-arrow"
            onClick={(e) => updateClass(e)}
            onBlur={(e) => removeClass(e)}
            autoComplete="off"
            onChange={(e) => setNatId(e.target.value)}
            required
          />
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <div className="input-icon" id="phone">
            <FaPhoneAlt className="icon" fill="black" size={36} />
          </div>
          <input
            type={'number'}
            placeholder="Phone Number"
            id="PhoneNumber"
            className="no-arrow"
            onClick={(e) => updateClass(e)}
            onBlur={(e) => removeClass(e)}
            autoComplete="off"
            onChange={(e) => setPhone_number(e.target.value)}
            required
          />
        </div>
        <div className="input-container" style={{ width: '100%' }}>
          <Select
            classNamePrefix="rangerSelect"
            className="formSelect"
            options={options}
            onChange={setType}
            isSearchable={false}
          />
        </div>

        <div className="input-container" style={{ width: '100%' }}>
          <button type="submit" className="submitButton">
            Create{' '}
          </button>
        </div>
      </div>
    </form>
  )
}
export default RangerForm
