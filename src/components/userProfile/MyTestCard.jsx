
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCirclePlus, CiRead, CiCircleCheck, CiFaceSmile } from 'react-icons/ci'

const MyTestCard = ({testId}) => {
  const [dataTest, setDataTest] = useState()
  useEffect(() => {
    if(testId !== undefined){
      axios.get(`/api/getMyTestData/?id=${testId}`)
      .then(res => {
        setDataTest(res.data)

      })
    }
  } ,[testId])
  return (  
    <Link href={`/testpage/?id=${testId}`} className="border border-green-800 rounded-lg p-4 col-span-1 cursor-pointer">
      <div className="font-bold text-2xl text-green-800 h-[60px] overflow-hidden">
        {dataTest !== undefined && dataTest.title}
      </div>
      <div className="text-slate-500 h-[89px] overflow-hidden">
        {dataTest !== undefined && dataTest.description}
      </div>
      <ul className="flex flex-col gap-2 text-md">
        <li className="flex gap-2 items-center">
          <CiRead size={26}/>
          <span>Просмотрено:</span>
          <span>{dataTest !== undefined && dataTest.watchings}</span>
        </li>
        <li className="flex gap-2 items-center">
          <CiCirclePlus size={26}/>
          <span>Начато:</span>
          <span>{dataTest !== undefined && dataTest.started}</span>
        </li>
        <li className="flex gap-2 items-center">
          <CiCircleCheck size={26}/>
          <span>Пройдено:</span>
          <span>{dataTest !== undefined && dataTest.finished}</span>
        </li>
        <li className="flex gap-2 items-center">
          <CiFaceSmile size={26}/>
          <span>Рейтинг:</span>
          <span>
            {dataTest !== undefined ? 
              (
                dataTest.ratingResult === 0 ? 'Оценки отсутствуют' : dataTest.ratingResult
              ) 
              : 
              'Загрузка'  
            }
          </span>
        </li>
      </ul>
    </Link>
  );
}
 
export default MyTestCard;