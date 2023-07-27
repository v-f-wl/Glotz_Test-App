'use state'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { RxExit } from 'react-icons/rx'
import MyTestCard from './MyTestCard';
import Cookies from 'js-cookie';
import TitleWithLine from '../UI/TitleWithLine';

const ProfileContainer = () => {
  const router = useRouter()
  const { id } = router.query
  const cookiesId = Cookies.get('id')
  const [personInfo, setPersonInfo] = useState()
  const [restInfo, setTestInfo] = useState()


  useEffect(() => {
    if(id !== undefined && id === cookiesId){
      axios.get(`/api/getMyData/?id=${id}`)
      .then(res => {
        setPersonInfo(res.data.userInfo)
        setTestInfo(res.data.testData)
      })
    }
  }, [id])

  const renderTests = () => {
    const arr = []
    for(const i of restInfo){
      arr.push(<MyTestCard key={i} testId={i}/>)
    }
    return arr
  }

  const exitFromProfile = () => {
    Cookies.remove('id')
    Cookies.remove('token')
    router.push('/')
  }
  return ( 
    <div className="flex flex-col gap-4 md:gap-8 mb-4 md:mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl md:text-5xl text-sky-900 font-bold">
          {personInfo !== undefined && personInfo.fullName}
        </h2>
        <div 
          onClick={() => exitFromProfile()}
          className="cursor-pointer flex items-center gap-2 transition hover:opacity-20"
        >
          <span className='underline'>Выход</span>
          <RxExit className='' size={24}/> 
        </div>
      </div>

      <TitleWithLine title='Ваши тесты'/>


      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {personInfo !== undefined  ?  
          renderTests() 
          : 
          <div className="col-span-2 text-green-800 text-xl text-center">У вас пока нет тестов</div>
        }
      </div>
    </div>
  );
}
 
export default ProfileContainer;