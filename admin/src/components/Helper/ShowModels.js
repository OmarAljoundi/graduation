import ImageView from '../Views/ImageView'
import { PopupActions, AnimationType, OutAnimationType } from 'react-custom-popup'
import GoogleMapView from '../Views/GoogleMapView'
import RangerForm from '../Views/RangerForm'
import ChangePassword from '../Views/ChangePassword'
import OTP from '../Views/OTP'

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
  PopupActions.showModal(<RangerForm />, AnimationType.FADE_IN, OutAnimationType.FADE_OUT)
}
export const showChangePassword = () => {
  PopupActions.showModal(<ChangePassword />, AnimationType.FADE_IN, OutAnimationType.FADE_OUT)
}
export const showForgetPassword = ({phoneNumber}) => {
  PopupActions.showModal(<OTP phoneNumber={phoneNumber}/>, AnimationType.FADE_IN, OutAnimationType.FADE_OUT)
}
