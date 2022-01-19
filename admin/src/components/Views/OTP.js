import axios from 'axios';
import React, { Fragment, useState } from 'react'
import Countdown from "react-countdown";
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { handleSetAuthedUser } from '../../actions/authedUser';
import { loadingTimer,Loading } from '../Helper/Loading';
const api = 'http://localhost:5000/ranger/resendCode'
const api2 = "http://localhost:5000/reset-password"
const OTP = ({phoneNumber,nationality_id,password}) => {
    const [resend,setResend] = useState(0)
     const [code,setCode] = useState("")
      const isUserLogedin = useSelector(({ authedUser }) => (authedUser ? authedUser.signin : false))
     const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    let currentTime = Date.now() + 30000

const renderer = ({ seconds, completed,nationality_id }) => {
  if (completed) {
   return (
   <div className="d-flex flex-row mt-5 content">
           <button id='main-submit' onClick={()=>resendCode(nationality_id)}>Resend</button>
        </div>
   )
  } else {
    return (
      <span>
        You Can ask for resend in 00:{seconds}
      </span>
    );
  }
};
const resetPassword = async () => {
    try {
        setLoading(true)
        const response = await axios.put(api2,{nationality_id,password,code,phoneNumber})
        console.log("response",response)
        Promise.all([loadingTimer(1500)]).then(()=>{
        dispatch(handleSetAuthedUser(response.data.info, response.headers.authorization))
        PopupActions.showToast({
            text: `Logged In Successfully!`,
            type: DialogType.SUCCESS,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white'
          })
          setLoading(false)
      })
        
        
    } catch (error) {
       
        console.log("error",error)
        Promise.all([loadingTimer(1500)]).then(()=>{
        PopupActions.showToast({
            text: `Code Is Wrong Try Again!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white'
          })
          setLoading(false)
      })
       
    }


}
const resendCode = async () => {
    try {
        await axios.post(api, { nationality_id })
        PopupActions.showToast({
            text: `One time password sent!`,
            type: DialogType.SUCCESS,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white'
          })
          setResend((resend) => resend + 1)
    } catch (error) {
         PopupActions.showToast({
            text: `Something Went Wrong!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white'
          })
    }
}
 if (isUserLogedin === true) {
    return <Navigate to="/" />
  }
  if(loading === true){
      return <Loading type={'spin'} color={'red'} styleClass="sign-spin"/>
  }
return(
<Fragment>
    <div className="rangerPage d-flex justify-content-center align-items-center container">
    <div className="card py-5 px-3">
        <h5 className="m-0">Mobile Phone Verification</h5>
            <span className="mobile-text">
                Enter The Code We Just Send On Your Phone: 
            <b className="text-danger"> {phoneNumber}</b>
        </span>
        <div className="d-flex flex-row mt-5">
            <input type="number" className="form-control lf--input no-arrow" autoFocus="" maxLength={6} onChange={(e)=>setCode(e.target.value)}/>
        </div>
        <div className="d-flex flex-row mt-5 content">
           <button id='main-submit' onClick={()=>resetPassword()}>Verify</button>
        </div>
        <Countdown date={currentTime} renderer={renderer} key={resend}/>
        </div>
    </div>
</Fragment>
)
}
export default OTP


