import axios from 'axios'
import { PopupActions, AnimationType, OutAnimationType } from 'react-custom-popup'
import UserView from '../Views/UserView'

export const firstPromise = (button, api, id, status, token) =>
  new Promise(function (resolve) {
    setTimeout(async function a() {
      button.classList.add('onclic')
      await axios({
        method: 'put',
        url: `${api}/${id}`,
        data: { status: status },
        headers: { authorization: 'Bearer ' + token }
      }).then((response) => {
        resolve(response.status)
      })
    }, 250)
  })

export const thirdPromise = (button) => {
  new Promise(function (resolve) {
    setTimeout(function c() {
      button.classList.remove('validate')
      resolve()
    }, 1250)
  })
}

export const viewUser = (userId, rangerID, token, api) => {
  let userInfo = null
  let promise = new Promise(function (resolve) {
    axios({
      method: 'get',
      url: `${api}/${userId ? userId : rangerID}`,
      headers: { authorization: 'Bearer ' + token }
    }).then((response) => {
      console.log(response.data)
      userInfo = response.data
      resolve()
    })
  })
  Promise.all([promise]).then(function () {
    function end() {
      if (userInfo) {
        PopupActions.showModal(
          <UserView userInfo={userInfo} type={userId ? 'user' : 'ranger'} />,
          AnimationType.FADE_IN,
          OutAnimationType.FADE_OUT
        )
      }
    }
    end()
  })
}

export const updateClass = (e) => {
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
export const removeClass = (e) => {
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
