import axios from 'axios';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import Countdown from "react-countdown";
import { DialogType, PopupActions, ToastPosition } from 'react-custom-popup';
import { useDispatch } from 'react-redux';
import { handleSetAuthedUser } from '../../actions/authedUser';
import { loadingTimer,Loading } from '../Helper/Loading';
const api = 'http://localhost:5000/ranger/resendCode'
const api2 = "http://localhost:5000/reset-password"
const OTP = ({phoneNumber,nationality_id,password}) => {
    const [resend,setResend] = useState(0)
    const [code,setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
    document.body.classList.add('login')
    return () => {
      document.body.classList.remove('login')
    }
  }, [])
  
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
        Promise.all([loadingTimer(1500)]).then(()=>{
        dispatch(handleSetAuthedUser(response.data.info, response.headers.authorization))
        PopupActions.showToast({
            text: `Logged In Successfully!`,
            type: DialogType.SUCCESS,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
          setLoading(false)
      })
        
        
    } catch (error) {
        Promise.all([loadingTimer(1500)]).then(()=>{
        PopupActions.showToast({
            text: `Code Is Wrong Try Again!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
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
            progressColor:'white',
            showCloseButton:false
          })
          setResend((resend) => resend + 1)
    } catch (error) {
         PopupActions.showToast({
            text: `Something Went Wrong!`,
            type: DialogType.DANGER,
            position: ToastPosition.TOP_CENTER,
            timeoutDuration: 3000,
            showProgress:true,
            progressColor:'white',
            showCloseButton:false
          })
    }
}

  if(loading === true){
      return <Loading type={'bubbles'} color={'red'} styleClass="sign-spin"/>
  }
  const memoCode = useMemo(()=>{
    return Date.now() + 5000
  },[resend])
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
            <input type="text" className="form-control lf--input no-arrow" autoFocus="" maxLength={6} onChange={(e)=> isNaN(e.target.value) ? null : setCode(e.target.value)} value={code}/>
        </div>
        <div className="d-flex flex-row mt-5 content">
           <button id='main-submit' onClick={()=>resetPassword()}>Verify</button>
        </div>
        <Countdown date={memoCode} renderer={renderer} key={resend}/>
        </div>
    </div>
</Fragment>
)
}
export default OTP


