'ise client'
import { useEffect, useState } from "react";
import AnswerInput from "./AnswerInput";

const InputsQiestion = ({index, data, changeValue, countOfAnswer}) => {
  const [questionBody, setQuestionBody] = useState(data || {})

  const handleChangeData = (index, category, value) => {
    setQuestionBody(prev => {
      const obj = {...prev}
      obj[`${category}${index}`] = value
      return obj
    })
  }

  useEffect(() => {
    changeValue(index, questionBody)
  }, [questionBody])

  const renderAnswer = () => {
    const arr = []
    for(let i = 1; i <= countOfAnswer; i++){
      arr.push(
        <AnswerInput 
          key={`ans${index}${i}`} 
          index={i} 
          handleAnswerChange={(index, category, value) => handleChangeData(index, category, value)}
        />
      )
    }
    return arr
  }

  return ( 
    <div className="border border-green-800 rounded-lg p-2 md:p-4 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <label className='font-medium text-lg md:text-xl'>
            {index}.
          </label>
          <input 
            onChange={(e) => handleChangeData('','title', e.target.value)}
            value={questionBody.title || ''}
            type="text" 
            placeholder='Введите вопрос'
            className="py-1 md:py-2 px-2 md:px-3 border-b w-full outline-none font-medium text-lg md:text-xl" 
          />
        </div>
        <h3 className="text-md md:text-xl font-medium">Ответы:</h3>
        <ul className="ml-2 md:ml-4 flex flex-col gap-4">
          {countOfAnswer > 0 && renderAnswer()}
        </ul>
      </div>
  );
}
 
export default InputsQiestion;