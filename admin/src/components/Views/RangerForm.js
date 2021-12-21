import React, { useState } from 'react'
import '../../style/Form.css'
import '../../style/login.scss'
import Select from 'react-select'
import { FaUserCircle, FaEnvelope, FaIdCard, FaWindowClose, FaPhoneAlt } from 'react-icons/fa'
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup'
import axios from 'axios'
import { useSelector } from 'react-redux'

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
  function updateClass(e) {
    const id = e.target.id
    switch (id) {
      case 'first':
        document.getElementById('firstName').classList.add('active')
        break
      case 'last':
        document.getElementById('lastName').classList.add('active')
        break
      case 'email':
        document.getElementById('emailAddress').classList.add('active')
        break
      case 'Nationality':
        document.getElementById('natId').classList.add('active')
        break
      case 'PhoneNumber':
        document.getElementById('phone').classList.remove('active')
        break
      default:
        break
    }
  }
  function removeClass(e) {
    const id = e.target.id
    switch (id) {
      case 'first':
        document.getElementById('firstName').classList.remove('active')
        break
      case 'last':
        document.getElementById('lastName').classList.remove('active')
        break
      case 'email':
        document.getElementById('emailAddress').classList.remove('active')
        break
      case 'Nationality':
        document.getElementById('natId').classList.remove('active')
        break
      case 'PhoneNumber':
        document.getElementById('phone').classList.remove('active')
        break
      default:
        break
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(first)
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
        if (response.status === 201) {
          PopupActions.showToast({
            text: `Account Has Been Create For ${first + ' ' + last}`,
            type: DialogType.SUCCESS,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000
          })
          PopupActions.hideModal()
        } else {
          PopupActions.showToast({
            text: `Something Went Wrong, Try Again!`,
            type: DialogType.DANGER,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
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
