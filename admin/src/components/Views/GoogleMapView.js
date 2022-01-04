import React, { useEffect } from 'react'
import GoogleMap from 'google-map-react'
import '../../style/users.scss'
import '../../style/MapView.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { PopupActions } from 'react-custom-popup'
import { FaWindowClose } from 'react-icons/fa'

const GoogleMapView = ({ location }) => {
  useEffect(() => {
    document.getElementsByClassName('react-custom-modal-wrapper')[0].classList.add('easy-map')
  }, [])
  const center = {
    lat: location.x,
    lng: location.y
  }
  return (
    <div
      className="ShowModelImage animate__animated animate__slideInUp animate__faster"
      style={{ height: '100vh', width: '100%' }}
    >
      <FaWindowClose
        className="closeBtn"
        size={50}
        fill="red"
        style={{ float: 'right', cursor: 'pointer' }}
        onClick={() => PopupActions.hideModal()}
      />
      <GoogleMap
        bootstrapURLKeys={{ key: '' }}
        defaultZoom={18}
        defaultCenter={center}
        hoverDistance={15}
      >
        <div className="pin" lat={center.lat} lng={center.lng}>
          <a
            href={`https://www.google.com/maps/place/${center.lat},${center.lng}`}
            rel="noreferrer"
            target={'_blank'}
          >
            <FaMapMarkerAlt size={32} color="red" />
          </a>
        </div>
      </GoogleMap>
    </div>
  )
}

export default GoogleMapView
