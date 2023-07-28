
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCirclePlus, CiRead, CiCircleCheck, CiFaceSmile } from 'react-icons/ci'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeSelect, resetSelect } from "@/redux/deleteSetting/select-slice";

const MyTestCard = ({testId, isEdit}) => {
  const [dataTest, setDataTest] = useState()
  const [loaded, setLoaded] = useState(false)
  const [testWasDeleted, setTestWasDeleted] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const selectParams = useSelector(state => state.selectReducer.id);
  const dispatch = useDispatch()

  useEffect(() => {
    if(selectParams === testId){
      setConfirmDelete(true)
    }else{
      setConfirmDelete(false)
    }
  }, [selectParams, testId])
  useEffect(() => {
    if(isEdit === false){
      dispatch(resetSelect())
    }
  }, [isEdit, dispatch])
  useEffect(() => {
    if(testId !== undefined){
      axios.get(`/api/getMyTestData/?id=${testId}`)
      .then(res => {
        setDataTest(res.data)

      })
    }
  } ,[testId])

  const ButtonAcсept = ({title, color, handleFunction}) => {
    return(
      <div 
        onClick={handleFunction}
        className={`
          border
          ${color === 'accept' ? 'bg-green-500' : 'bg-red-400'}
          rounded-lg 
          text-lg 
          font-medium 
          py-2 
          px-3 
          text-white 
          cursor-pointer hover:opacity-50 transition-all
        `}
      >
        {title}
      </div>
    )
  }

  const deleteTest = () => {
    setLoaded(true)
    axios.delete(`/api/deleteTest/?id=${testId}`)
    .then(() => setTestWasDeleted(true))
  }

  return (  
    <div className={`${testWasDeleted ? 'hidden' : 'block'} relative transition-all z-10 border border-green-800 rounded-lg p-4 col-span-1 overflow-hidden`}>
      <Link href={`/testpage/?id=${testId}`} className={`${isEdit ? 'text-white' : ''} cursor-pointer`}>
        <div className="font-bold text-2xl text-green-800 h-[60px] overflow-hidden">
          {dataTest !== undefined && dataTest.title}
        </div>
        <div className={`${isEdit ? 'text-white' : 'text-slate-500'} h-[89px] overflow-hidden`}>
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
        <div className="mt-4 flex items-center gap-4">
        </div>
      </Link>
      <div className={`${isEdit ? 'block' : 'hidden'} absolute z-30 top-0 left-0 w-full h-full flex flex-col items-center justify-center`}>
        <div 
          onClick={() => dispatch(changeSelect({id: testId}))}
          className={`${confirmDelete ? 'hidden' : 'flex'} p-4 flex-col gap-3 items-center justify-center cursor-pointer transition-all hover:border hover:border-indigo-400 hover:text-indigo-400 rounded-lg`}
        >
          <AiOutlineDelete size={32}/>
          <span>Удалить</span>
        </div>
        <div className={`${confirmDelete ? 'flex' : 'hidden'} gap-4`}>
          <ButtonAcсept handleFunction={deleteTest} title='Удалить' color='accept'/>
          <ButtonAcсept handleFunction={() => dispatch(resetSelect())} title='Отмена'/>
        </div>
      </div>
      <div className={`${loaded ? 'block' : 'hidden'} absolute z-30 top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white`}>
        <AiOutlineLoading3Quarters size={36} className="animate-spin"/> 
      </div>
    </div>
  );
}
 
export default MyTestCard;