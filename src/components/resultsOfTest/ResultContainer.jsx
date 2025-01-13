'use client'
import { useEffect, useState } from "react";
import TitleWithLine from "../UI/TitleWithLine";
import ResultCard from "./ResultCard";
import { useRouter } from "next/router";
import axios from "axios";

const ResultContainer = () => {
  const [resultData, setResultData] = useState()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if(id === undefined){
      return
    }
    axios.get(`/api/getMyData/?id=${id}`)
    .then(res =>setResultData(res.data.userInfo.resultsOfTest))
  } ,[id])

  const renderResult = () => {
    const arr = []
    for(const item in resultData){
      arr.push(<ResultCard key={item} id={item} title={resultData[item].title} description={resultData[item].description} /> )
    }
    return arr
  }
  return ( 
    <div className="mb-4 md:mb-8 flex flex-col gap-4 md:gap-8">
      <TitleWithLine title='Tests completed by you' />
      <div className="flex flex-col gap-4">
        {resultData !== undefined && renderResult()}
      </div>
    </div>
  );
}
 
export default ResultContainer;