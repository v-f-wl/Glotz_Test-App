'use client'
import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import InputsQiestion from './InputsQiestion'
import Button from '../UI/Button'

const CreateQuestions = ({nextStepQuestion, countOfAnswer}) => {
  const [countOfQuestion, setQountOfQuestion] = useState(1)
  const [questionData, setQuestionData] = useState({})

  const handleDataChange = (index, data) => {
    setQuestionData(prev => {
      const obj = {...prev}
      obj[`question${index}`] = data
      return obj
    })
  }

  const renderRules = () =>{
    if(countOfAnswer === 2){
      return (
        <ul>
          <li>
            Первый вариант ответа - 0 баллов 
          </li>
          <li>
            Второй вариант ответа - 2 балла 
          </li>
        </ul>
      )
    }else if(countOfAnswer === 3){
      return (
        <ul>
          <li>
            Первый вариант ответа - 0 баллов 
          </li>
          <li>
            Второй вариант ответа - 2 балла 
          </li>
          <li>
            Третий вариант ответа - 4 балла 
          </li>
        </ul>
      )
    }else{
      return (
        <ul>
          <li>
            Первый вариант ответа - 1 баллов 
          </li>
          <li>
            Второй вариант ответа - 2 балла 
          </li>
          <li>
            Третий вариант ответа - 3 балла 
          </li>
          <li>
            Третий вариант ответа - 4 балла 
          </li>
        </ul>
      )
    }
  }
  const renderQuesions = () => {
    const arr = []
    for(let i = 1; i <= countOfQuestion; i++){
      arr.push(
        <InputsQiestion
          changeValue={(i, data) => handleDataChange(i, data)}
          key={`InputsQiestion${i}`} 
          index={i} 
          data={questionData[`question${i}`]}
          countOfAnswer={countOfAnswer}
        />
      )
    }
    return arr
  }

  return ( 
    <div className="flex flex-col gap-4 md:gap-8">
        <div className="text-lg md:text-xl font-medium text-slate-600">
          Введите вопросы и ответы вашего теста. Вы выбрали {countOfAnswer} варианта ответов на вопрос. Каждый ответ будет содержать следующее количество баллов 
        </div>

        <div className="text-light">
          {renderRules()}
        </div>

        <div className="flex flex-col gap-4 md:gap-8">
          <h3 className="text-2xl font-medium text-green-800">
            Вопросы:
          </h3>
          <div className="flex flex-col gap-4">
            {renderQuesions()}
          </div>
          <div 
            onClick={() => setQountOfQuestion(prev => prev = prev + 1)}
            className="flex items-center justify-center gap-2 py-2  border border-green-900 rounded-lg cursor-pointer hover:text-blue-700 hover:border-blue-700 transition-all"
          >
            <CiSquarePlus size={24}/>
            <span>
              Добавить вопрос
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <Button
            handleClick={() => nextStepQuestion(questionData, countOfQuestion)} 
            validationValue={true} 
            titleValue='Продолжить'
          />
        </div>
      </div>
  );
}
 
export default CreateQuestions;