import React, { Fragment } from 'react'
import { VerifiedIcon, XCircleIcon, PersonFillIcon } from '@primer/octicons-react'
import dateFormat from 'dateformat'
import '../style/users.scss'
import { PopupActions, DialogType, ToastPosition } from 'react-custom-popup'
import { firstPromise, thirdPromise, viewUser } from './Helper/UpdateStatus'
import { useDispatch } from 'react-redux'
import { handleUpdateService } from '../actions/services'

const api = 'http://localhost:5000/services'
const getUserApi = 'http://localhost:5000/users'
const getRangerApiForService = 'http://localhost:5000/rangers/services'

const ServiceType = (props) => {
  const dispatch = useDispatch()
  const { service, type, token } = props

  async function updateStatus(e) {
    const button = e.target
    const serviceStatus = button.id
    let id = button.getAttribute('data')
    let status = await firstPromise(button, api, id, serviceStatus, token)

    let dispatchStore = new Promise(function (resolve) {
      setTimeout(function b() {
        if (status === 201) {
          dispatch(handleUpdateService(serviceStatus, --id))
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
            text: `Service Has Been ${serviceStatus}!`,
            type: DialogType.SUCCESS,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000
          })
        } else {
          PopupActions.showToast({
            text: `Service Couldnt Be ${serviceStatus}!`,
            type: DialogType.DANGER,
            position: ToastPosition.BOTTOM_RIGHT,
            timeoutDuration: 5000
          })
        }
      }
      result()
    })
  }

  return (
    <Fragment>
      <main>
        <table className="site-wrapper">
          <thead>
            <tr>
              <th>ID</th>
              <th>Entity Name</th>
              <th>Notes</th>
              {type['value'] === 'cars_check_request' ? (
                <Fragment>
                  <th>Is Company</th>
                  <th>Number of Cars</th>
                </Fragment>
              ) : null}
              {type['value'] === 'course_request' ? (
                <Fragment>
                  <th>Age Group</th>
                  <th>Expected Audience</th>
                  <th>Service Date</th>
                </Fragment>
              ) : null}
              <th>Apply By</th>
              <th>Create At</th>
              <th>Status</th>
              <th>Close By</th>
            </tr>
          </thead>
          <tbody>
            {service
              .filter((s) => s.service_type === type['value'])
              .map((service) => (
                <tr key={service.id}>
                  <td title="ID">{service.id}</td>
                  <td title="Entity Name">{service.entity_name}</td>
                  <td title="Notes">{service.notes}</td>
                  {type['value'] === 'cars_check_request' ? (
                    <Fragment>
                      <td title="Is Company">{service.is_company ? 'Yes' : 'No'}</td>
                      <td title="Number of Cars">{service.number_of_cars}</td>
                    </Fragment>
                  ) : null}
                  {type['value'] === 'course_request' ? (
                    <Fragment>
                      <td title="Age Group">{service.age_group}</td>
                      <td title="Expected Audience">{service.expected_audience}</td>
                      <td title="Service Date">
                        {dateFormat(service.service_date, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                      </td>
                    </Fragment>
                  ) : null}
                  <td title="Apply By">
                    <div
                      className="hIVLKn"
                      style={{ margin: '0 auto', cursor: 'pointer' }}
                      onClick={() => viewUser(service.user_id, null, token, getUserApi)}
                    >
                      <PersonFillIcon size={24} fill="black" />
                    </div>
                  </td>

                  <td title="Create At">
                    {dateFormat(service.create_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                  </td>
                  <td title="Status" style={{ width: '315px' }}>
                    {' '}
                    {service.status === 'declined' ? (
                      <XCircleIcon size={24} fill="red" />
                    ) : service.status === 'approved' ? (
                      <VerifiedIcon size={24} fill="green" />
                    ) : (
                      <Fragment>
                        <div className="containerTwo">
                          <button
                            id="approved"
                            className="approve"
                            data={service.id}
                            onClick={(e) => updateStatus(e)}
                          ></button>
                        </div>
                        <div className="containerTwo">
                          <button
                            id="declined"
                            className="decline"
                            data={service.id}
                            onClick={(e) => updateStatus(e)}
                          ></button>
                        </div>
                      </Fragment>
                    )}
                  </td>
                  <td>
                    {service.status === 'pending' ? (
                      <span>Pending</span>
                    ) : (
                      <div
                        className="hIVLKn"
                        style={{ margin: '0 auto', cursor: 'pointer' }}
                        onClick={() => viewUser(null, service.id, token, getRangerApiForService)}
                      >
                        <PersonFillIcon size={24} fill="black" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </Fragment>
  )
}

export default ServiceType
