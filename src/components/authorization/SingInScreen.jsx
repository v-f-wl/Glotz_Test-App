'use client'

import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiRead, CiUnread } from 'react-icons/ci'
import Paragraph from "../UI/Paragraph";

const SingInScreen = ({changeScreen}) => {
  const [load, setLoad] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [handleError, setHandleError] = useState(false)

  const router = useRouter()
  const validation = () => {
    if(firstName.length < 2){
      return false
    }
    if(secondName < 2){
      return false
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(emailRegex.test(emailValue) === false || emailValue.length < 8){
      return false
    }
    if(passwordValue.length < 4){
      return false
    }
    return true
  }

  const createAccount = () => {
    setLoad(true)
    if(validation() === false){
      setLoad(false)
      setHandleError(true)
      return false
    }else{
      const infoAboutUser = {
        fullName: `${firstName} ${secondName}`,
        email: emailValue,
        password: passwordValue
      }
      try{
        axios.post('/api/userSingin', infoAboutUser)
        .then((res) => {
          Cookies.set('id', res.data._id)
          Cookies.set('token', res.data.token)
          router.push('/')
        })
      }catch(error){
        setHandleError(true)
        setLoad(false)
      }
    }
  }
  return ( 
    <div >
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
        <span class="relative flex h-[100px] w-[100px]">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span class="relative inline-flex rounded-full h-[100px] w-[100px] bg-slate-200"></span>
        </span>
      </div>
      <h2 className="text-center text-2xl lg:text-4xl font-medium  text-green-900">
        Регистрация
      </h2>
      {!!handleError && 
        <div className="mt-4 text-center font-light">
          <Paragraph description='Убедитесь, что данные введены верно'/>
        </div>
      }
      <form className="mt-8 flex flex-col gap-4">
        <input 
          type="text" 
          className="border p-2 rounded-lg" 
          placeholder="Имя" 
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input 
          type="text" 
          className="border p-2 rounded-lg" 
          placeholder="Фамилия"
          onChange={(e) => setSecondName(e.target.value)}
          value={secondName}
        />
        <input 
          type="text" 
          className="border p-2 rounded-lg" 
          placeholder="Электронная почта"
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
        />
        <div className="flex relative">
          <input 
            type={showPassword ? 'text' : 'password'}
            className="w-full h-full p-2 pr-10 border rounded-lg" 
            placeholder="Пароль"
            onChange={(e) => setPasswordValue(e.target.value)}
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
            onClick={() => createAccount()}
            className="border border-green-800 py-2 px-4 rounded-lg cursor-pointer"
          >
            Регистрация
          </div>
          <div 
            onClick={changeScreen}
            className="underline cursor-pointer p-2 text-slate-500"
          >
            Вход
          </div>
        </div>
      </form>
    </div>
  );
}
 
export default SingInScreen;