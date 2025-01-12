'use client'
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuFries, CiMenuBurger } from 'react-icons/ci'

const NavHeader = () => {
  const [userProfile, setUserProfile] = useState(undefined)
  const [openBurger, setOpenBurger] = useState(false)
  const [userName, setUserName] = useState('')
  const [linkId, setLinkId] = useState('')
  const token = Cookies.get('token')
  const userId = Cookies.get('id')

  useEffect(() => {
    if(token == undefined || userId == undefined){
      setUserProfile(false)
    }else{
      const dataValue = {
        "token": token,
        "user": userId
      }
      axios.post('/api/profileInfo', dataValue)
      .then((res) => {
        setUserName(res.data.user.fullName)
        setLinkId(res.data.user._id)
        setUserProfile(true)
      })
      .catch((err) => {
        Cookies.set('token', '')
        Cookies.set('user', '')
        setUserProfile(false)
      })
    }
  },[token, userId])
  return ( 
    <div className={`${userProfile !== undefined ? 'block' : 'hidden'}`}>
      <div 
        onClick={() => setOpenBurger(prev => prev = !prev)}
        className={`md:hidden cursor-pointer relative z-20`}
      >
        {openBurger ?
        <CiMenuFries size={32}/>
        :
        <CiMenuBurger size={32}/>
        }
      </div>
      <ul 
        className={`
          ${openBurger ? 'top-0' : '-top-[200vh]'} 
          ${openBurger ? 'top-0' : '-top-[200vh]'} 
          transition-all
          absolute 
          inset-0 
          w-screen 
          h-screen 
          bg-white

          flex 
          flex-col
          items-center 
          justify-center 
          gap-2 
          text-md
          font-medium

          md:text-lg
          md:font-normal
          md:flex-row
          md:items-center 
          md:gap-8 
          md:bg-inherit
          md:static
          md:w-auto 
          md:h-auto
        `}
      >
        <li className="">
          <Link href='/' className="block py-3 text-green-900 transition hover:text-red-300 cursor-pointer">
          Tests
          </Link>
        </li>
        <li className="">
          <Link href={`${userProfile == true ? `/resultPage/?id=${userId}` : '/authorizationPage'}`} className="block py-3 text-green-900 transition hover:text-red-300 cursor-pointer">
          Results
          </Link>
        </li>
        <li className="">
          <Link href={`${userProfile == true ? '/createPage' : '/authorizationPage'}`} className="block py-3 text-green-900 transition hover:text-red-300 cursor-pointer">
          Create a test
          </Link>
        </li>
        {userProfile == true ? 
          (
            <Link href={`/myProfile/?id=${linkId}`} className="">{userName}</Link>
          ) 
          : 
          (
            <li className="flex items-center gap-2">
              <Link href="/authorizationPage" className="block py-3 text-green-900 transition hover:text-red-300 cursor-pointer">
                Sign In 
              </Link>
              <span>/</span>
              <Link href={`/authorizationPage/?id=signin`} className="block py-3 text-green-900 transition hover:text-red-300 cursor-pointer">
                Sign Up
              </Link>
            </li>
          )
        }
      </ul>
    </div> 
  );
}
 
export default NavHeader;