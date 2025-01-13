'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CiSquareChevDown, CiSquareChevUp } from 'react-icons/ci'
import Button from '../UI/Button'

const FinishScreen = ({
    totalTitle, 
    totalDescription, 
    totalQuestions, 
    totalAnswerCount,
    totalResult,
    createTest,
    finishModal
  }) => {
  const [openQuestions, setOpenQuestions] = useState(false)
  const [openResult, setOpenResult] = useState(false)

  const router = useRouter()
  const renderAnswer = (questions) => {
    const arr = []
    const QuestionForm = ({index}) => {
      return (
        <li className="text-base text-md font-normal">
          <span className="">{index}.</span>
          {questions[`answer${index}`]}
        </li>
      )
    }
    for(let i = 1; i <= totalAnswerCount; i++){
      arr.push(<QuestionForm key={`que_${i}`} index={i}/>)
    }
    return arr
  }
  const renderQuestion = () => {
    if(openQuestions === false){
      return
    }
    const arr = []
    const QuestionCard = ({title, questions}) => {
      return (
        <div className="border border-green-800 rounded-lg p-4">
          <div className="text-green-800 font-bold text-2xl">
            {title}
          </div>
          <ul className=''>
            {renderAnswer(questions)}
          </ul>
        </div>
      )
    }
    for(let item in totalQuestions){
      arr.push(<QuestionCard key={`que_${item}`} title={totalQuestions[item].title} questions={totalQuestions[item]}/>)
    }
    return arr
  }

  const renderResult = () => {
    if(openResult === false){
      return
    }
    const arr = []
    const ResultCard = ({title, score, discription}) => {
      return (
        <div className="border border-green-800 rounded-lg p-4">
          <div className="text-green-800 font-bold text-lg md:text-2xl">
            {title}
          </div>
          <div className="mt-1 md:mt-2 font-light text-sm text-slate-500">
            Score: from  {score}
          </div>
          <div className="mt-2 md:mt-4 text-sm md:text-base text-slate-700">
            {discription}
          </div>
        </div>
      )
    }
    for(const item in totalResult){
      arr.push(<ResultCard key={totalResult[item].score} title={totalResult[item].title} score={totalResult[item].score} discription={totalResult[item].description}/> )
    }
    return arr
  }
  return ( 
    <div className="">
        {finishModal && (
          <div className="absolute inset-0 z-10 bg-white flex flex-col justify-center items-center gap-8">
            <h3 className="font-bold text-4xl text-green-800">Test created</h3>
            <div 
              onClick={() => router.push('/')}
              className="inline-block underline cursor-pointer"
            >
              Return to the main page
            </div>
          </div>
        )}
        <h2 className="text-2xl md:text-5xl font-bold text-green-900">
          {totalTitle}
        </h2>
        <p className="mt-2 md:mt-4 text-md md:text-xl">
          {totalDescription}
        </p>
        <div className="mt-6 flex flex-col gap-4 font-bold text-2xl text-green-900">
          <div 
            onClick={() => setOpenQuestions(prev => !prev)}
            className="
              px-2 
              py-4 
              inline-flex 
              items-center 
              gap-2 
              text-slate-700 
              text-md
              md:text-2xl 
              cursor-pointer 
              border 
              rounded-lg
            "
          >
            {openQuestions ? (<CiSquareChevUp size={24}/> ) : (<CiSquareChevDown size={24}/> )}
            <span>
            Test questions
            </span>
          </div>
          <div className="flex flex-col gap-4">{renderQuestion()}</div>
        </div>
        <div className="mt-6 flex flex-col gap-6 font-bold text-2xl text-green-900">
          <div 
            onClick={() => setOpenResult(prev => !prev)}
            className="
              px-2 
              py-4 
              inline-flex 
              items-center 
              gap-2 
              text-slate-700 
              text-2xl 
              cursor-pointer 
              border 
              rounded-lg
            "
          >
            {openResult ? (<CiSquareChevUp size={24}/> ) : (<CiSquareChevDown size={24}/> )}
            <span>Test results</span>
          </div>
          <div className="flex flex-col gap-4">
            {renderResult()}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-8">
          <Button
            handleClick={createTest}
            validationValue={true}
            titleValue='Create'
          />
        </div>
      </div>
  );
}
 
export default FinishScreen;