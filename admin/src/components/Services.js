import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { handleSetServices } from '../actions/services'
import { useSelector, useDispatch } from 'react-redux'
import '../style/users.scss'
import '../style/SearchBar.css'
import { SearchIcon, ArrowLeftIcon } from '@primer/octicons-react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import ServiceType from './ServiceType'

const api = 'http://localhost:5000/services'
const options2 = [
  { value: 'approved', label: 'approved' },
  { value: 'pending', label: 'pending' },
  { value: 'declined', label: 'declined' }
]
const options3 = [
  { value: 'Latest', label: 'Latest' },
  { value: 'Oldest', label: 'Oldest' }
]
const options4 = [
  { value: 'proposal_request', label: 'Proposal Request' },
  { value: 'cars_check_request', label: 'Cars Check' },
  { value: 'course_request', label: 'Course Request' }
]
const Service = () => {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [sort, setSort] = useState('')
  const [serviceType, setServiceType] = useState({
    value: 'proposal_request',
    label: 'Proposal Request'
  })
  const dispatch = useDispatch()
  const authedUser = useSelector(({ authedUser }) => (authedUser ? authedUser : null))
  let token = authedUser.token
  let role = authedUser.role

  useEffect(async () => {
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch(handleSetServices(response.data.sort((a, b) => a.id - b.id)))
    } catch (error) {
      console.error(error)
    }
    return () => {
      console.log('component will unmount')
    }
  }, [])

  function filterService() {
    const services = useSelector(({ services }) => (services ? services : []))
    let tempServices
    tempServices =
      query !== ''
        ? Object.values(services).filter((service) =>
            service.entity_name.toLowerCase().startsWith(query.toLowerCase())
          )
        : services

    switch (status ? status['value'] : 'None') {
      case 'pending':
        tempServices = Object.values(tempServices).filter((service) => service.status === 'pending')
        break
      case 'approved':
        tempServices = Object.values(tempServices).filter(
          (service) => service.status === 'approved'
        )
        break
      case 'declined':
        tempServices = Object.values(tempServices).filter(
          (service) => service.status === 'declined'
        )
        break
    }
    switch (sort ? sort['value'] : 'None') {
      case 'Latest':
        return Object.values(tempServices).sort((a, b) => a.id - b.id)
      case 'Oldest':
        return Object.values(tempServices).sort((a, b) => b.id - a.id)
      default:
        return Object.values(tempServices)
    }
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
              placeholder="Search by Entity Name .."
              onChange={(e) => setQuery(e.target.value)}
            />
            <Select
              classNamePrefix="AllSelect"
              options={options4}
              onChange={setServiceType}
              defaultValue={options4[0]}
              isSearchable={false}
            />
          </div>
          <div className="form" style={{ float: 'right', justifyContent: 'end' }}>
            <Select
              classNamePrefix="AllSelect"
              options={options2}
              value={status}
              isClearable={true}
              placeholder="Select Status .."
              onChange={setStatus}
              isSearchable={false}
            />
            <Select
              classNamePrefix="AllSelect"
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
      <ServiceType service={filterService()} type={serviceType} token={token} role={role}></ServiceType>
    </Fragment>
  )
}
export default Service
