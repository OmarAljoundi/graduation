import React, { Component, Fragment } from 'react'
import '../style/SearchBar.css'
import Select from 'react-select'
import { SearchIcon } from '@primer/octicons-react'
import { handleSetUsers } from '../actions/users'
import { connect } from 'react-redux'

const options = [
  { value: 'Name', label: 'Name' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'National ID', label: 'National ID' }
]
class SearchBar extends Component {
  state = {
    type: '',
    query: '',
    newUsers: []
  }

  filterUsers = (e) => {
    e.preventDefault()
    const { query } = this.state
    const { users } = this.props
    if (users) {
      const filterd = users.filter((user) => user.name.startsWith(query))
      this.setState({ newUsers: filterd })
    }
  }

  handleQueryChange = (e) => {
    this.setState({ query: e.target.value })
  }

  render() {
    const { query } = this.state
    console.log(query)
    return (
      <Fragment>
        <div className="centerbox">
          <div className="main-form-container">
            <form id="" className="form" onChange={(e) => this.filterUsers(e)}>
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
              <Select classNamePrefix="select" options={options} />
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}
function mapStateToProps({ users }, { newUsers }) {
  return {
    users: newUsers ? newUsers : users
  }
}
export default connect(mapStateToProps, { handleSetUsers })(SearchBar)
