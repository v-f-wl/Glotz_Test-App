'use client'
import { useCallback, useEffect, useState } from "react";

const ResultCard = ({number, resultCount ,maxPoint, updateData}) => {
  const [dataResult, setDataResult] = useState({})
  const [inputValue, setInputValue] = useState(false)

  const handleChangeData = useCallback((label, value) => {
    setDataResult(prev => {
        const obj = {...prev}
        obj[label] = value
        return obj
      } 
    )
  }, [])

  useEffect(() => {
    if(dataResult.score > maxPoint || dataResult.score < 0){
      setInputValue(true)
    }else{
      setInputValue(false)
    }
  }, [resultCount, dataResult.score, maxPoint])

  useEffect(() => {
    updateData(number, dataResult)
  },[dataResult, number])

  useEffect(() => {
    if(number === 1){
      handleChangeData('score', '0')
    }
  }, [number])


  return ( 
    <div className="border-l border-green-900 pl-4">
      <div className="text-xl font-bold text-green-900">Result {number}</div>
      <div className="flex items-center gap-2 text-xl  text-slate-600">
        Score: from 
        {number === 1 ? 
          (
            <div className="">0</div>
          ) 
          : 
          (
            <input 
              onChange={(e) => handleChangeData('score', e.target.value)}
              type="number" 
              className={`${inputValue ? 'border-red-400' : ''} w-[60px] border-b outline-none`}
              value={dataResult.score || ''}
            />
          )
        }
      </div>
      <input 
        onChange={(e) => handleChangeData('title', e.target.value)}
        type="text" 
        className="mt-2 w-full p-2 outline-none border border-slate-200 rounded-lg text-lg md:text-2xl font-medium" 
        placeholder="Result title"
        value={dataResult.title || ''}
      />
      <textarea 
        onChange={(e) => handleChangeData('description', e.target.value)}
        rows="3" 
        className="mt-4 w-full resize-none border border-slate-200 rounded-lg outline-none p-2 text-md md:text-xl" 
        placeholder="Result description"
        value={dataResult.description || ''}
      >

      </textarea>
    </div>
  );
}
 
export default ResultCard;