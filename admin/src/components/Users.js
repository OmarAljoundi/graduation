import React, { Component, Fragment } from 'react'
import '../style/users.scss'
import '../style/SearchBar.css'
import axios from 'axios'
import { VerifiedIcon, UnverifiedIcon } from '@primer/octicons-react'
import { SearchIcon, ArrowLeftIcon } from '@primer/octicons-react'
import Select from 'react-select'
import { handleSetUsers } from '../actions/users'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

const api = 'http://localhost:5000/users'
const options = [
  { value: 'Name', label: 'Name' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'National ID', label: 'National ID' }
]
const options2 = [
  { value: 'Verified', label: 'Verified' },
  { value: 'Not Verified', label: 'Not Verified' }
]
const options3 = [
  { value: 'Latest', label: 'Latest' },
  { value: 'Oldest', label: 'Oldest' }
]

class Users extends Component {
  state = {
    users: [],
    type: { value: 'Name', label: 'Name' },
    query: '',
    status: '',
    sort: ''
  }

  async componentDidMount() {
    try {
      const response = await axios.get(api)
      this.props.handleSetUsers(response.data)
      this.setState({ users: response.data })
    } catch (error) {
      console.error(error)
    }
  }
  filterUsers = () => {
    const { query, type, status, sort } = this.state
    const { users } = this.props
    let tempUsers
    switch (type['value']) {
      case 'Name':
        tempUsers =
          query !== ''
            ? users.filter((user) => user.name.toLowerCase().startsWith(query.toLowerCase()))
            : users
        break
      case 'Phone Number':
        tempUsers =
          query !== ''
            ? users.filter((user) => user.phone_number.startsWith(query.toLowerCase()))
            : users
        break
      case 'National ID':
        tempUsers =
          query !== ''
            ? users.filter((user) => user.nationality_id.startsWith(query.toLowerCase()))
            : users
        break
      default:
        tempUsers = users ? users : null
    }
    switch (status ? status['value'] : 'None') {
      case 'Verified':
        tempUsers = tempUsers.filter((user) => user.status === 'vertify')
        break
      case 'Not Verified':
        tempUsers = tempUsers.filter((user) => user.status === 'not vertifiy')
        break
    }
    switch (sort ? sort['value'] : 'None') {
      case 'Latest':
        return tempUsers.sort((a, b) => a.id - b.id)
      case 'Oldest':
        return tempUsers.sort((a, b) => b.id - a.id)
      default:
        return tempUsers
    }
  }

  handleQueryChange = (e) => {
    this.setState({ query: e.target.value })
  }
  handleTypeChange = (seacrhType) => {
    this.setState({ type: seacrhType })
  }
  handleStatusChange = (statusType) => {
    this.setState({ status: statusType })
  }
  handleSortChange = (sortTyoe) => {
    this.setState({ sort: sortTyoe })
  }

  render() {
    const { status, sort } = this.state
    const { users } = this.props
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
                onChange={(e) => this.handleQueryChange(e)}
              />

              <Select
                classNamePrefix="searchBarSelect"
                options={options}
                onChange={this.handleTypeChange}
                defaultValue={options[0]}
                isSearchable={false}
              />
            </div>
            <div className="form" style={{ float: 'right', justifyContent: 'end' }}>
              <Select
                classNamePrefix="searchBarSelect"
                options={options2}
                value={status}
                isClearable={true}
                placeholder="Select Status .."
                onChange={this.handleStatusChange}
                isSearchable={false}
              />
              <Select
                classNamePrefix="searchBarSelect"
                options={options3}
                value={sort}
                isClearable={true}
                placeholder="Sort By .."
                onChange={this.handleSortChange}
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
                <th>Name</th>
                <th>E-mail</th>
                <th>Gender</th>
                <th>Birth date</th>
                <th>Phone Number</th>
                <th>Nationality ID</th>
                <th>Create At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users
                ? this.filterUsers().map((user) => (
                    <tr key={user.id}>
                      <td title="ID">{user.id}</td>
                      <td title="Name">{user.name}</td>
                      <td title="Email">{user.email}</td>
                      <td title="Gender">{user.gender}</td>
                      <td title="Birth date">{dateFormat(user.b_date, ' yyyy, mmmm,dd')}</td>
                      <td title="Phone Number">{user.phone_number}</td>
                      <td title="Nationality ID">{user.nationality_id}</td>
                      <td title="Create At">
                        {dateFormat(user.create_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                      </td>
                      <td title="Status">
                        {' '}
                        {user.status === 'vertify' ? (
                          <VerifiedIcon size={24} fill="green" />
                        ) : (
                          <UnverifiedIcon size={24} fill="red" />
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
}

function mapStateToProps({ users }) {
  return {
    users: users ? users : null
  }
}
export default connect(mapStateToProps, { handleSetUsers })(Users)
