'use client'

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiRead, CiUnread } from 'react-icons/ci'
import Paragraph from "../UI/Paragraph";

const LogInScreen = ({changeScreen}) => {
  const [load, setLoad] = useState(false)
  const [emailValue, setEmail] = useState('')
  const [passwordValue, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [handleError, setHandleError] = useState(false)
  const router = useRouter()
  const validation = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(emailValue) === false || emailValue.length < 8){
      return false
    }
    if(passwordValue.length < 4){
      return false
    }
    return true
  }

  const logIn = () => {
    setLoad(true)
    if(validation() === false){
      setLoad(false)
      setHandleError(true)
      return
    }else{
      const dataValue = {
        email: emailValue,
        password: passwordValue
      }
      axios.post('/api/userLogin', dataValue)
      .then((res) => {
        Cookies.set('id', res.data._id)
        Cookies.set('token', res.data.token)
        router.push('/')
      })
      .catch((err) => {
        setHandleError(true)
        setLoad(false)
      })
    }
  }
  return ( 
    <div className="">
      <div 
        className={`
          absolute
          flex items-center justify-center
          inset-0
          bg-slate-500
          bg-opacity-40
          z-10
          ${load ? 'block' : 'hidden'}
        `}
      >
        <span className="relative flex h-[100px] w-[100px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-[100px] w-[100px] bg-slate-200"></span>
        </span>
      </div>
      <h2 className="text-center text-2xl lg:text-4xl  font-medium  text-green-900">
      Login
      </h2>
      {!!handleError && 
        <div className="mt-4 text-center font-light">
          <Paragraph description='Make sure the data is entered correctly'/>
        </div>
      }
      <form className="mt-8 flex flex-col gap-4">
        <input 
          onChange={(e) => setEmail(e.target.value)}
          type="text" 
          className="border p-2 rounded-lg" 
          placeholder="Email"
          value={emailValue}
        />
        <div className="flex relative">
          <input 
            type={showPassword ? 'text' : 'password'}
            className="w-full h-full p-2 pr-10 border rounded-lg" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={passwordValue}
          />
          <div 
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute top-0 right-0 h-full w-10 flex items-center justify-center cursor-pointer"
          >
            {showPassword ? 
              (
                <CiUnread size={24}/>
              )
              :
              (
                <CiRead size={24}/>
              )
            }
          </div>
        </div>
        <div className="mt-4 flex items-center gap-8">
          <div 
            onClick={() => logIn()}
            className="border border-green-800 py-2 px-4 rounded-lg cursor-pointer"
          >
            Sign In
          </div>
          <div 
            onClick={changeScreen}
            className="underline cursor-pointer p-2 text-slate-500"
          >
            Registration
          </div>
        </div>
      </form>
    </div>
  );
}
 
export default LogInScreen;