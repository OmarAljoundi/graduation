import React from 'react'
import '../../style/users.scss'
import { PopupActions } from 'react-custom-popup'
import { FaWindowClose } from 'react-icons/fa'

const UserView = (props) => {
  const { src } = props

  return (
    <div className="ShowModelImage animate__animated animate__slideInUp animate__faster">
      <FaWindowClose
        size={100}
        fill="red"
        style={{ width: '60px', height: '52px', background: 'white' }}
        onClick={() => PopupActions.hideModal()}
        className="closeBtn"
      />
      <div>
        <img src={src} alt="complaintImage" />
      </div>
    </div>
  )
}
export default UserView
