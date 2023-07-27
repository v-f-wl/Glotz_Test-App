'use client'

import { useEffect, useState } from "react"
import ResultCard from "./ResultCard"
import Button from "../UI/Button"

const CreateResult = ({questionQount, point, resultAnswer, nextStep, changeValue}) => {
  const [maxPoint, setMaxPoint] = useState()
  const [valid, setValid] = useState(false)
  const [dataResult, setDataResult] = useState({})
  useEffect(() => {
    if(point === 2){
      setMaxPoint(prev => prev = questionQount * 2) 
    }else{
      setMaxPoint(prev => prev = questionQount * 4) 
    }
  }, [point, questionQount, dataResult])


  const validation = () => {
    const scores = []
    for(const item in dataResult){
      if(!dataResult[item].score || !dataResult[item].title || !dataResult[item].score){
        setValid(true)
        return
      }
      if(dataResult[item].score > maxPoint || scores.indexOf(dataResult[item].score) !== -1){
        setValid(true)
        return
      }
      scores.push(dataResult[item].score )
    }
    changeValue(dataResult)
    nextStep()
  }
  const handleChangeData = (index,data) => {
    setDataResult(prev => {
      const obj = {...prev}
      obj[`result${index}`] = data
      return obj
    })
  }
  const renderResult = () => {
    const arr = []
    for(let i = 1; i <= resultAnswer; i++){
      arr.push(
        <ResultCard 
          key={`result${i}`}
          updateData={(index,data) => handleChangeData(index,data)}
          number={i}
          resultCount={point}
          maxPoint={maxPoint}
        />
      )
    }
    return arr
  }
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <span className="text lg:text-2xl text-green-900 font-medium">Введите результаты вашего теста.</span>
        <span className="text-md md:text-xl text-slate-800">Вопросов в тесте: {questionQount}, максимальноe количество баллов: {maxPoint}</span>
      </div>
      <div className="flex flex-col gap-8">
        {renderResult()}
      </div>
      <div className="flex justify-center gap-8">
        <Button
          handleClick={validation} 
          validationValue={true} 
          titleValue='Продолжить'
        />
      </div>
    </div>
  );
}
 
export default CreateResult;