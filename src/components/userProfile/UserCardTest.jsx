'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiRead, CiFaceSmile, CiGrid41 } from 'react-icons/ci'

const UserCardTest = ({id}) => {
  const [testData, setTestData] = useState()
  const [notFound, setNotFound] = useState(false)
  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getInfoAboutTest/?id=${id}`)
      .then(res => setTestData(res.data))
      .catch(error => setNotFound(true))
    }
  }, [id])

  return ( 
    <Link href={notFound ? '' :`/testpage/?id=${id}`} 
      className={`${notFound ? 'hidden' : 'flex'} flex-col gap-4 border border-teal-700 p-6 rounded-md shadow-md transition-all hover:shadow-green-800/40`}
    >
      <h3 className="font-bold text-3xl text-slate-600 h-[65px] overflow-hidden">
        {testData !== undefined && testData.title}
      </h3>
      <span className="text-slate-500 h-[89px] overflow-hidden">
        {testData !== undefined && testData.description}
      </span>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500">
          <CiRead size={20}/>
          <span className="text-sm">
            {testData !== undefined && testData.watchings}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <CiFaceSmile size={20}/>
          <span className="text-sm">
            {testData !== undefined && testData.ratingResult !==0  ? testData.ratingResult : '-'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <CiGrid41 size={20}/>
          <span className="text-sm">
            {testData !== undefined && testData.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
 
export default UserCardTest;