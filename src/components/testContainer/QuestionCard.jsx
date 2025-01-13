'use client'
import { useState } from "react";
import Button from "../UI/Button";
import MainTitle from "../UI/MainTitle";

const QuestionCard = ({answerCount, question, questionsCount, addScore, questionOrder}) => {
  const [numberOfAnswer, setNumberOfAnswer] = useState(0)
  
  const renderAnswer = () => {
    const arr = []
    const Answer = ({index, title}) => {
      return (
        <div 
          onClick={() =>setNumberOfAnswer(index)}
          className={`
            ${index == numberOfAnswer && 'border-sky-600'}
            ${index == numberOfAnswer && 'border-2'}
            p-2   
            md:p-4   
            flex 
            items-center 
            gap-4 
            border 
            border-green-800 
            rounded-lg 
            transition-all 
            hover:border-sky-300
            text-md
            md:text-xl
            font-medium
          `}
        >
          <span>
            {index}.
          </span>
          <span>
            {title}
          </span>
        </div>
      )
    }
    for(let i = 1; i <= answerCount; i++){
      arr.push(<Answer key={`answer${i}`} index={i} title={question[`answer${i}`]}/> )
    }
    return arr

  }

  const answerToQuestion = () => {
    if(numberOfAnswer === 0){
      return
    }
    addScore(numberOfAnswer)
    setNumberOfAnswer(0)
  }
  return ( 
    <div className="flex flex-col items-center gap-4">
      <div className="mx-auto md:w-[905px] text-center">
        <MainTitle title={question !== undefined && question.title}/>
      </div>
      <div className="mt-4 font-medium text-xl text-slate-400">
        {questionOrder} / {questionsCount}
      </div>
      <div className="mt-6 md:mt-12 flex flex-col gap-4 w-full">
        {renderAnswer()}
      </div>
      <Button handleClick={answerToQuestion} validationValue={numberOfAnswer > 0} titleValue='Continue'/>
    </div>
  );
}
 
export default QuestionCard;