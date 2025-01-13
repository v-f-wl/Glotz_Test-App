'use client'
import { useCallback, useEffect, useState } from "react";
import TitleWithLine from "../UI/TitleWithLine";
import CreateTitle from "./CreateTitle";
import CountOfAnsers from "./CountOfAnsers";
import CreateQuestions from "./CreateQuestions";
import CreateResult from "./CreateResult";
import FinishScreen from "./FinishScreen";
import axios from "axios";
import Cookies from "js-cookie";

const CreateTest = () => {
  const [page, setPage] = useState(1)
  const [userInfor, setUserInfo] = useState()
  const [dataTest, setDataTest] = useState({
    title: '',
    description: '',
    countOfResult: -1,
    countOfAnswer: -1,
    category: '',
    questionsCount: -1,
    questions: {},
    result: {}
  }) 
  const [finishModal, setFinishModal] = useState(false)
  const token = Cookies.get('token')
  const userId = Cookies.get('id')
  
  useEffect(() => {
    if(token == undefined || userId == undefined){
      setUserProfile(false)
    }else{
      const dataValue = {
        "token": token,
        "user": userId
      }
      axios.post('/api/profileInfo', dataValue)
      .then((res) => {
        setUserInfo(res.data.user)
      })
      .catch((err) => {

      })
    }
  },[token, userId])
  
  const changeTitle = useCallback((title, desc) => {
    setDataTest(prev => {
      const obj = {...prev}
      obj.title = title
      obj.description = desc
      return obj
    }
    )
    setPage(prev => prev + 1)
  }, [])

  const changeParams = useCallback((data) => {
    setDataTest(prev => {
      const obj = {...prev}
      obj.countOfResult = data.result
      obj.countOfAnswer = data.question
      obj.category = data.category
      return obj
    })
  },[])

  const changeQuestions = useCallback((data, count) => {
    setDataTest(prev => {
      const obj = {...prev}
      obj.questions = data
      obj.questionsCount = count
      return obj
    })
    setPage(prev => prev = prev + 1)
  },[])

  const changeResult = useCallback((data) => {
    setDataTest(prev => {
      const obj = {...prev}
      obj.result = data
      return obj
    })
  }, [])

  const createTest = () => {
    try{
      const data = {...dataTest}

      data.userId = userInfor._id
      data.user = userInfor.fullName
      axios.post('/api/createTest', data)
      .then((res) => {
        setFinishModal(true)
      })
      .catch(err => console.log(err))
    }catch(error){

    }
  }

  const renderComponent = () => {
    switch(page){
      case 1:
        return (
          <CreateTitle
            titleData={dataTest.title}
            descriptionData={dataTest.description}
            nextStep={(title, desc) => changeTitle(title, desc)}
          />
        )
      case 2:
        return (
          <CountOfAnsers
            prevStep={() => setPage(prev => prev = prev - 1)}
            nextStep={() => setPage(prev => prev = prev + 1)}
            changeValue={(data) => changeParams(data)}
          />
        )
      case 3:
        return (
          <CreateQuestions
            nextStepQuestion={(data, count) => changeQuestions(data, count)}
            countOfAnswer={dataTest.countOfAnswer}
          />
        )
      case 4:
        return (
          <CreateResult
            questionQount={dataTest.questionsCount}
            nextStep={() => setPage(prev => prev = prev + 1)}
            point={dataTest.countOfAnswer}
            resultAnswer={dataTest.countOfResult}
            changeValue={(data) => changeResult(data)}
          />
        )
      case 5:
        return (
          <FinishScreen
            totalTitle={dataTest.title}
            totalDescription={dataTest.description}
            totalAnswerCount={dataTest.countOfAnswer}
            totalQuestions={dataTest.questions}
            totalResult={dataTest.result}
            totalResultCount={dataTest.countOfResult}
            createTest={createTest}
            finishModal={finishModal}
          />
        )
      default: 
        return <CreateTitle/>
    }
  }
  return ( 
    <div className="flex items-center flex-col relative">
      <TitleWithLine title='Create a test' linePosition={true}/>
      <div className="mt-6 md:mt-12 w-full mb-8">
        {renderComponent()}
      </div>
    </div>
  );
}
 
export default CreateTest;