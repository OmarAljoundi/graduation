import ImageView from '../Views/ImageView'
import { PopupActions, AnimationType, OutAnimationType } from 'react-custom-popup'
import GoogleMapView from '../Views/GoogleMapView'
import AddRanger from '../AddRanger'

export const showImage = (src) => {
  PopupActions.showModal(<ImageView src={src} />, AnimationType.FADE_IN, OutAnimationType.FADE_OUT)
}
export const showMap = (location) => {
  PopupActions.showModal(
    <GoogleMapView className="easy" location={location} />,
    AnimationType.FADE_IN,
    OutAnimationType.FADE_OUT
  )
}

export const showForm = () => {
  PopupActions.showModal(<AddRanger />, AnimationType.FADE_IN, OutAnimationType.FADE_OUT)
}

