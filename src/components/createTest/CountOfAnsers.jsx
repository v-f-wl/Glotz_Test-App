'use client'
import { useCallback, useEffect, useState } from "react";
import { category } from "@/templates/category";
import Button from "../UI/Button";

const CountOfAnsers = ({prevStep, nextStep, changeValue}) => {
  const [muteButton, setMuteButton] = useState(false)
  const [dataValue, setDataValue] = useState({
    result: undefined,
    question: undefined,
    category: undefined
  })

  useEffect(() => {
    if(dataValue.question !== undefined && dataValue.result !== undefined && dataValue.category !== undefined){
      setMuteButton(true)
      changeValue(dataValue)
    }else{
      setMuteButton(false)
    }
  }, [dataValue, changeValue])

  const Title = ({title}) => {
    return (
      <h3 className="text-xl font-medium text-slate-600 text-center">
        {title}
      </h3>
    )
  }

  const changeData = useCallback((range, label) => {
    setDataValue(prev => {
      const obj = {...prev}
      obj[label] = range

      return obj
    })
  }, [])

  const renderCheckBox = (range, label) => {
    const arr = []
    let count = 2
    const CardBox = ({range, label}) => {
      return (
        <div 
          className={`
            ${dataValue[label] === range && 'border-indigo-400'}
            ${dataValue[label] === range && 'text-indigo-400'}
            relative 
            w-[80px] 
            h-[100px] 
            md:w-[140px] 
            md:h-[160px] 
            border 
            border-green-900 
            rounded-md 
            flex 
            items-center 
            justify-center
            cursor-pointer
        `}
          onClick={()=> changeData(range, label)}
        >
          <span className="text-4xl md:text-8xl">{range}</span>
        </div>
      )
    }
    for(let i = 1; i <= 3; i++){
      arr.push(<CardBox key={`${label}_${range}`} range={range !== 1 ? i + 1 : (count)} label={label}/>)
      count = count + 2
    }
    return arr
  }
  const renderCategory = () => {
    const arr = []
    const CategoryTag = ({value, index}) => {
      return (
        <li 
          onClick={() => changeData(value, 'category')}
          className={`
            ${dataValue.category === value ? 'border-indigo-400' : ''} 
            ${dataValue.category === value ? 'text-indigo-400' : ''} 
            py-1 px-2
            md:py-2 md:px-3
            font-medium 
            border
            border-green-800
            cursor-pointer rounded-lg 
          `}
        >
          {value}
        </li>
      )
    }
    for(let i = 0; i < category.length; i++){
      arr.push(
        <CategoryTag 
          key={`category${i}`} 
          index={i} 
          value={category[i]}
        />
      )
    }
    return arr
  }

  return ( 
    <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col gap-4">
          <Title title='Выберете количество возможных результатов после прохождения вашего теста'/>
          <span></span>
          <div className="flex justify-center gap-4 md:gap-10">
            {renderCheckBox(1, 'result')}
          </div>   
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Title title='Выберете количество вариантов ответов  на вопрос'/>
          <span></span>
          <div className="flex justify-center gap-4 md:gap-10">
            {renderCheckBox(2, 'question')}
          </div>  
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <h3 className="text-xl font-medium text-slate-600 text-center">
            Выберете категорию вашего теста
          </h3>
          <span></span>
          <ul className="flex justify-center gap-2 md:gap-4 flex-wrap md:px-[30%]">
            {renderCategory()}
          </ul> 
        </div>
        <div className="mt-4 md:mt-0 flex justify-center gap-4 md:gap-8">
          <Button
            handleClick={prevStep}
            validationValue={true}
            titleValue='Назад'
          />
          <Button
            handleClick={nextStep}
            validationValue={muteButton}
            titleValue='Продолжить'
          />
        </div>
    </div>
  );
}
 
export default CountOfAnsers;