import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../style/users.scss'
import '../style/SearchBar.css'
import '../style/Complaints.scss'
import { VerifiedIcon, PersonFillIcon } from '@primer/octicons-react'
import { SearchIcon, ArrowLeftIcon } from '@primer/octicons-react'
import { handleSetComplaints, handleUpdateComplaints } from '../actions/complaints'
import Select from 'react-select'
import dateFormat from 'dateformat'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { viewUser } from './Helper/UpdateStatus'
import { showImage, showMap } from './Helper/ShowModels'
import { filterComplaints } from './Helper/ComplaintsHelper'
import { firstPromise, thirdPromise } from './Helper/UpdateStatus'
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup'
const api = 'http://localhost:5000/complaints'
const getUserApi = 'http://localhost:5000/users'
const getRangerApiForComplaint = 'http://localhost:5000/rangers/complaints'

const Complaints = () => {
  const authedUser = useSelector(({ authedUser }) => (authedUser ? authedUser : null))
  let token = authedUser.token
  const complaints = useSelector(({ complaints }) => (complaints ? Object.values(complaints) : []))
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [sort, setSort] = useState('')

  const options2 = [
    { value: 'completed', label: 'completed' },
    { value: 'pending', label: 'pending' }
  ]
  const options3 = [
    { value: 'Latest', label: 'Latest' },
    { value: 'Oldest', label: 'Oldest' }
  ]

  const dispatch = useDispatch()
  useEffect(async () => {
    try {
      await axios({
        method: 'get',
        url: api,
        headers: { authorization: 'Bearer ' + token }
      }).then((response) => {
        dispatch(handleSetComplaints(response.data.sort((a, b) => a.id - b.id)))
      })
    } catch (err) {
      console.log('eerr' + err)
    }
  }, [])

  async function updateStatus(e) {
    const button = e.target
    const complaintStatus = 'completed'
    let id = button.getAttribute('data')
    let status = await firstPromise(button, api, id, complaintStatus, token)

    let dispatchStore = new Promise(function (resolve) {
      setTimeout(function b() {
        if (status === 201) {
          dispatch(handleUpdateComplaints(complaintStatus, --id))
        }
        button.classList.remove('onclic')
        button.classList.add('validate')
        resolve()
      }, 2250)
    })

    let clear = thirdPromise(button)

    Promise.all([status, dispatchStore, clear]).then(function () {
      function result() {
        if (status === 201) {
          PopupActions.showToast({
            text: `Complaint Has Been ${complaintStatus}!`,
            type: DialogType.SUCCESS,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000,
            showCloseButton:false
          })
        } else {
          PopupActions.showToast({
            text: `Complaint Couldnt Be ${complaintStatus}!`,
            type: DialogType.DANGER,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000,
            showCloseButton:false
          })
        }
      }
      result()
    })
  }

  if(!authedUser.signin){
    return <Navigate to='/'/>
  }

  return (
    <Fragment>
      <div className="centerbox">
        <div className="main-form-container">
          <div className="form" style={{ justifyContent: 'start' }}>
            <Link to="/">
              <div className="hIVLKn">
                <ArrowLeftIcon size={32} fill="black" />
              </div>
            </Link>
            <label className="lf--label searchIcon" htmlFor="search">
              <SearchIcon size={24} fill="red" />
            </label>
            <input
              id="search"
              type="text"
              className="main-input main-name"
              name="NAME"
              placeholder="Search by"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="form" style={{ float: 'right', justifyContent: 'end' }}>
            <Select
              classNamePrefix="searchBarSelect"
              options={options2}
              value={status}
              isClearable={true}
              placeholder="Select Status .."
              onChange={setStatus}
              isSearchable={false}
            />
            <Select
              classNamePrefix="searchBarSelect"
              options={options3}
              value={sort}
              isClearable={true}
              placeholder="Sort By .."
              onChange={setSort}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      <main>
        <table className="site-wrapper">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Place_name</th>
              <th>Nearest_attraction</th>
              <th>Public</th>
              <th>Image</th>
              <th>Location</th>
              <th>Apply By</th>
              <th>Create At</th>
              <th>Status</th>
              <th>Close By</th>
            </tr>
          </thead>
          <tbody>
            {complaints
              ? filterComplaints(complaints, sort, status, query).map((complaint) => (
                  <tr key={complaint.id}>
                    <td title="ID">{complaint.id}</td>
                    <td title="Description">{complaint.description}</td>
                    <td title="Place_name">{complaint.place_name}</td>
                    <td title="Nearest_attraction">{complaint.nearest_attraction}</td>
                    <td title="Public">{complaint.public ? 'Yes' : 'No'}</td>
                    <td title="Image">
                      <div className="containerTwo">
                        <button
                          className="ShowImage"
                          onClick={() => showImage(complaint.image)}
                        ></button>
                      </div>
                    </td>
                    <td title="Location">
                      <div className="containerTwo">
                        <button
                          className="ShowLocation"
                          onClick={() => showMap(complaint.location)}
                        ></button>
                      </div>
                    </td>
                    <td title="Apply By">
                      <div
                        className="hIVLKn"
                        style={{ margin: '0 auto', cursor: 'pointer' }}
                        onClick={() => viewUser(complaint.user_id, null, token, getUserApi)}
                      >
                        <PersonFillIcon size={24} fill="black" />
                      </div>
                    </td>
                    <td title="Create At">
                      {dateFormat(complaint.create_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                    </td>
                    <td title="Status">
                      {' '}
                      {complaint.status === 'completed' ? (
                        <VerifiedIcon size={24} fill="green" />
                      ) : (
                        <div className="containerTwo">
                          <button
                            id="Completed"
                            className={!authedUser.role.includes("Execute") ? "Completed disabledBtn" : "Completed"}
                            disabled={!authedUser.role.includes("Execute")}
                            data={complaint.id}
                            onClick={(e) => updateStatus(e)}
                          ></button>
                        </div>
                      )}
                    </td>
                    <td>
                      {complaint.status === 'Needs Approval' ? (
                        <span>Pending</span>
                      ) : (
                        <div
                          className="hIVLKn"
                          style={{ margin: '0 auto', cursor: 'pointer' }}
                          onClick={() =>
                            viewUser(null, complaint.id, token, getRangerApiForComplaint)
                          }
                        >
                          <PersonFillIcon size={24} fill="black" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </main>
    </Fragment>
  )
}
export default Complaints
