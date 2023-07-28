'use client'
import { useRouter } from "next/router";
import TitleWithLine from "../UI/TitleWithLine";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCardTest from "./UserCardTest";

const UserContainer = () => {
  const [userData, setUserData] = useState()
  const [testsData, setTesstsData] = useState()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getMyData/?id=${id}`)
      .then(res => {
        setUserData(res.data.userInfo.fullName)
        setTesstsData(res.data.testData)
      })
    }
  },[id])

  const renderTest = () => {
    const arr = []

    for(const item of testsData){
      arr.push(<UserCardTest key={item} id={item}/>)
    }
    return arr
  }
  return ( 
    <div className="">
      <h2 className="text-3xl md:text-5xl text-sky-900 font-bold">
        {userData !== undefined && userData}
      </h2>
      <div className="mt-8">
        <TitleWithLine
          title='Тесты автора'
          linePosition={false}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mb-4 md:mb-8">
          {testsData !== undefined ?
            (
              renderTest()
            )
            :
            (
              <div className="">
                Тестов нет
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default UserContainer;