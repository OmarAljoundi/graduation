import axios from 'axios'
import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loading, loadingTimer } from './Helper/Loading'

import { handleDeleteRanger, handleSetRangers } from '../actions/rangers'
import { ArrowLeftIcon, SearchIcon,CheckCircleFillIcon } from '@primer/octicons-react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import '../style/users.scss'
import '../style/SearchBar.css'
import dateFormat from 'dateformat'
import { FaWindowClose } from 'react-icons/fa'
import { DialogType, usePopup } from 'react-custom-popup'

const api = 'http://localhost:5000/rangers'
const options = [
  { value: 'Name', label: 'Name' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'National ID', label: 'National ID' }
]
const options2 = [
  { value: 'Read / Execute / Create', label: 'Read / Execute / Create' },
  { value: 'Read / Execute', label: 'Read / Execute' },
  { value: 'Read', label: 'Read' }
]
const options3 = [
  { value: 'Latest', label: 'Latest' },
  { value: 'Oldest', label: 'Oldest' }
]
const Rangers = () => {
  const [type, setType] = useState({ value: 'Name', label: 'Name' })
  const { showOptionDialog, showToast } = usePopup()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [sort, setSort] = useState('')
  const dispatch = useDispatch()
  const rangers = useSelector(({ rangers }) => (rangers ? rangers : null))
  const authedUser = useSelector(({ authedUser }) => (authedUser ? authedUser : null))
  useEffect(async () => {
    try {
      const response = await axios.get(api)
      dispatch(handleSetRangers(response.data))
    } catch (error) {
      console.error(error)
    }
  }, [])

  const deleteRanger = (id) => {
    showOptionDialog({
      containerStyle: { width: 350 },
      text: "Are you sure you want to delete this user? You won't be able to revert that action.",
      title: 'Delete User?',
      options: [
        {
          name: 'Cancel',
          type: 'cancel'
        },
        {
          name: 'Delete',
          type: 'confirm',
          style: { background: 'lightcoral' }
        }
      ],
      onConfirm: async () => {
        setLoading(true)
        await axios({
          method: 'DELETE',
          url: `${api}/${id}`,
          headers: { Authorization: 'Bearer ' + authedUser.token }
        }).then((res) => {
          Promise.all([loadingTimer(1500)]).then(() => {
            if (res.status === 201) {
              dispatch(handleDeleteRanger(id))
              showToast({
                type: DialogType.SUCCESS,
                text: 'User Deleted',
                timeoutDuration: 3000,
                showProgress: true
              })
            } else {
              showToast({
                type: DialogType.DANGER,
                text: 'Something Went Wrong!',
                timeoutDuration: 3000,
                showProgress: true
              })
            }
            setLoading(false)
          })
        })
      }
    })
  }

  const filterRangers = () => {
    let tempRangers
    switch (type['value']) {
      case 'Name':
        tempRangers =
          query !== ''
            ? Object.values(rangers).filter((ranger) =>
                ranger.name.toLowerCase().startsWith(query.toLowerCase())
              )
            : Object.values(rangers)
        break
      case 'Phone Number':
        tempRangers =
          query !== ''
            ? Object.values(rangers).filter((ranger) =>
                ranger.phone_number.startsWith(query.toLowerCase())
              )
            : Object.values(rangers)
        break
      case 'National ID':
        tempRangers =
          query !== ''
            ? Object.values(rangers).filter((ranger) =>
                ranger.nationality_id.startsWith(query.toLowerCase())
              )
            : Object.values(rangers)
        break
      default:
        tempRangers = rangers ? Object.values(rangers) : null
    }
    switch (status ? status['value'] : 'None') {
      case 'Read / Execute / Create':
        tempRangers = tempRangers.filter((ranger) => ranger.role === 'Read / Execute / Create')
        break
      case 'Read / Execute':
        tempRangers = tempRangers.filter((ranger) => ranger.role === 'Read / Execute')
        break
      case 'Read':
        tempRangers = tempRangers.filter((ranger) => ranger.role === 'Read')
        break
    }
    switch (sort ? sort['value'] : 'None') {
      case 'Latest':
        return tempRangers.sort((a, b) => a.id - b.id)
      case 'Oldest':
        return tempRangers.sort((a, b) => b.id - a.id)
      default:
        return tempRangers
    }
  }

  return (
    <Fragment>
      <div className="centerbox">
        {loading === true && <Loading type={'bubbles'} color={'red'} styleClass="sign-spin"/>}
        <div className="main-form-container" style={{ opacity: loading ? '0.5' : '1' }}>
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

            <Select
              classNamePrefix="AllSelect"
              options={options}
              onChange={setType}
              defaultValue={options[0]}
              isSearchable={false}
            />
          </div>
          <div className="form" style={{ float: 'right', justifyContent: 'end' }}>
            <Select
              classNamePrefix="AllSelect"
              options={options2}
              isClearable={true}
              placeholder="Select Role .."
              onChange={setStatus}
              isSearchable={false}
            />
            <Select
              classNamePrefix="AllSelect"
              options={options3}
              isClearable={true}
              placeholder="Sort By .."
              onChange={setSort}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      <main style={{ opacity: loading ? '0.5' : '1' }}>
        <table className="site-wrapper">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone Number</th>
              <th>Nationality ID</th>
              <th>Create At</th>
              <th>Role</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(filterRangers()).map((ranger, index) => (
              <tr key={ranger.id} className={authedUser.nationality_id == ranger.nationality_id ? "youraccount" : ""}>
                <td title="ID">{ranger.id}</td>
                <td title="Name">{ranger.name}</td>
                <td title="Email">{ranger.email}</td>
                <td title="Phone Number">{ranger.phone_number}</td>
                <td title="Nationality ID">{ranger.nationality_id}</td>
                <td title="Create At">
                  {dateFormat(ranger.create_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                </td>
                <td title="Role">{ranger.role}</td>
                
                <td title="Remove" style={{ textAlign: 'center' }}>
                  {authedUser.nationality_id != ranger.nationality_id ?
                  <FaWindowClose
                    fill="red"
                    size={32}
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteRanger(ranger.id, index)}
                  />
                  :
                  <CheckCircleFillIcon fill="green" size={32} />
}
                </td>

                
                
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      
    </Fragment>
  )
}
export default Rangers
