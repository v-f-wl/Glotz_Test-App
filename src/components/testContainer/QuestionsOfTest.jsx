import axios from "axios";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const QuestionsOfTest = ({id, sendResult}) => {
  const [loaded, setLoaded] = useState(true)
  const [questionsList, setQuestionsList] = useState({}) 
  const [questionsCount, setQuestionsCount] = useState(0)
  const [questionOrder, setQuestionOrder] = useState(1)
  const [answerCount, setAnswerCount] = useState(0)
  const [score, setScore] = useState(0)


  useEffect(() => {
    if(id === undefined){
      return
    }
    axios.get(`/api/getQuestions/?id=${id}`)
    .then(res => {
      setQuestionsList(res.data.questions)
      setAnswerCount(res.data.countAnswer)
      setQuestionsCount(res.data.questionsCount)
      setLoaded(false)
    })
  } ,[id])

  const addScore = (value) => {
    const table = {
      2: {
        1: 0,
        2: 2
      },
      3:{
        1: 0,
        2: 2,
        3: 4
      },
      4:{
        1:1,
        2:2,
        3:3,
        4:4,
      }
    } 
    if(questionOrder < questionsCount){
      setScore(prev => prev = prev + table[answerCount][value])
      setQuestionOrder(prev => prev = prev + 1)
    }else{
      const total = score + table[answerCount][value]
      sendResult(total)
    }
  }
  return ( 
    <div className={`${loaded ? 'hidden' : 'flex'} flex-col`}>
      <QuestionCard
        answerCount={answerCount}
        question={questionsList[`question${questionOrder}`]}
        addScore={addScore}

        questionOrder={questionOrder}
        questionsCount={questionsCount}
      />
    </div>
  );
}
 
export default QuestionsOfTest;