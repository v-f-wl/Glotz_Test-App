'use client'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { RxExit, RxMixerVertical } from 'react-icons/rx'
import MyTestCard from './MyTestCard';
import Cookies from 'js-cookie';
import TitleWithLine from '../UI/TitleWithLine';

const ProfileContainer = () => {
  const router = useRouter()
  const { id } = router.query
  const cookiesId = Cookies.get('id')
  const [personInfo, setPersonInfo] = useState()
  const [testInfo, setTestInfo] = useState([])
  const [editTest, setEditTest] = useState(false)



  useEffect(() => {
    if(id !== undefined && id === cookiesId){
      axios.get(`/api/getMyData/?id=${id}`)
      .then(res => {
        setPersonInfo(prev => res.data.userInfo)
        setTestInfo(prev => res.data.testData)
      })
    }
  }, [id, cookiesId])

  const renderTests = () => {
    const arr = []
    for(const i of testInfo){
      arr.push(<MyTestCard key={i} testId={i} isEdit={editTest}/>)
    }
    return arr
  }

  const exitFromProfile = () => {
    Cookies.remove('id')
    Cookies.remove('token')
    router.push('/')
  }
  return ( 
    <div className="flex items-center md:items-start flex-col gap-4 md:gap-8 mb-4 md:mb-8">
      <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between">
        <h2 className="text-3xl md:text-5xl text-sky-900 font-bold">
          {personInfo !== undefined && personInfo.fullName}
        </h2>
        <div className="flex gap-4">
          <div 
            onClick={() => setEditTest(prev => prev = !prev)}
            className="cursor-pointer flex items-center gap-2 transition hover:opacity-20"
          >
          <span className='underline'>Edit</span>
          <RxMixerVertical size={24}/>
          </div>
          <div 
            onClick={() => exitFromProfile()}
            className="cursor-pointer flex items-center gap-2 transition hover:opacity-20"
          >
            <span className='underline'>Logout</span>
            <RxExit className='' size={24}/> 
          </div>
        </div>
      </div>

      <TitleWithLine title='Your tests'/>


      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {testInfo.length > 0 ?  
          renderTests() 
          : 
          <div className="col-span-2 text-green-800 text-xl text-center">You don’t have any tests yet</div>
        }
      </div>
    </div>
  );
}
 
export default ProfileContainer;