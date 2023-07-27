'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import AboutTestPage from "./AboutTestPage";
import QuestionsOfTest from "./QuestionsOfTest";
import Cookies from "js-cookie";
import ResultPage from "./ResultPage";
const TestContainer = () => {
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(true)
  const userId = Cookies.get('id')
  const [testTitle, setTestTitle] = useState({})
  const [testResult, setTestResult] = useState({})

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if(id === undefined){
      return
    }
    axios.get(`/api/getInfoAboutTest/?id=${id}`)
    .then(res => {
      setTestTitle(res.data)
      setLoad(false)
    })
    .catch(error => console.log(error))
    axios.post('/api/addWatching', {id: id})
  },[id])

  const startTest = () => {
    setPage(1)
  }

  const sendResult = (score) => {
    setLoad(true)
    setPage(prev => prev = prev + 1)
    axios.post('/api/getResult', {
      idTest: id,
      idUser: userId,
      resultScore: score
    })
    .then(res => {
      setTestResult(res.data)
      setLoad(false)
    })
  }
  const renderPage = () => {
    switch(page){
      case 0 :
        return (
          <AboutTestPage
            data={testTitle}
            nextStep={() => startTest()}
          />
        )
      case 1: 
        return ( 
          <QuestionsOfTest
            id={id}
            sendResult={(score) => sendResult(score)}
          />
        )
      case 2: 
        return (
          <ResultPage
            data={testResult}
            id={id}
          />
        )
      default:
        return <AboutTestPage/>
    }
  }
  
  return ( 
    <div className="">
      {load ? 
      (
        <div 
          className="
            absolute 
            top-0 
            bottom-0 
            left-0 
            right-0 
            flex 
            items-center 
            justify-center 
            border 
            border-green-800
          "
        >
          <AiOutlineLoading3Quarters className="animate-spin" size={42}/>
        </div>
      )
      :
      (renderPage())
      }
    </div>
  );
}
 
export default TestContainer;