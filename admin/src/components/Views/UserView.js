import React, { useEffect } from 'react'
import '../../style/users.scss'
import { PopupActions } from 'react-custom-popup'
import { FaWindowClose } from 'react-icons/fa'
import dateFormat from 'dateformat'

const UserView = (props) => {
  const { userInfo, type } = props
  useEffect(() => {
    document.getElementsByClassName('react-custom-modal-wrapper')[0].classList.add('user-view')
  }, [])

  return (
    <div className="ShowModel animate__animated animate__slideInUp animate__faster">
      <div>
        <FaWindowClose
          size={50}
          fill="red"
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={() => PopupActions.hideModal()}
        />
        <h1 style={{ float: 'left', margin: '10px', color: 'white' }}>User Information </h1>
      </div>
      <main>
        <table className="site-wrapper">
          <thead>
            <tr>
              <th>ID</th>
              <td title="ID">{userInfo.id}</td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td title="Name">{userInfo.name}</td>
            </tr>
            {type === 'user' ? (
              <tr>
                <th>E-mail</th>
                <td title="Email">{userInfo.email}</td>
              </tr>
            ) : null}
            {type === 'user' ? (
              <tr>
                <th>Gender</th>
                <td title="Gender">{userInfo.gender}</td>
              </tr>
            ) : null}
            {type === 'user' ? (
              <tr>
                <th>Birth date</th>
                <td title="Birth date">{dateFormat(userInfo.b_date, ' yyyy, mmmm,dd')}</td>
              </tr>
            ) : null}
            <tr>
              <th>Phone Number</th>
              <td title="Phone Number">{userInfo.phone_number}</td>
            </tr>
            <tr>
              <th>Nationality ID</th>
              <td title="Nationality ID">{userInfo.nationality_id}</td>
            </tr>
          </thead>
        </table>
      </main>
    </div>
  )
}
export default UserView
