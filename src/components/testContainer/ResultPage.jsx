'use client'
import Link from "next/link";
import ResultRaitingButton from "./ResultRaitingButton";
import { useState } from "react";
import axios from "axios";
import Button from "../UI/Button";
import MainTitle from "../UI/MainTitle";
import Paragraph from "../UI/Paragraph";

const ResultPage = ({data, id}) => {
  const [ratingValue, setRatingValue] = useState(-1)
  const [ratingSent, setRatingSent] = useState(false)
  const [modalSendRating, setModalSendRating] = useState(false)

  const changeRatingValue = (value) => {
    if(ratingSent === true){
      return
    }
    setRatingValue(value)
  }

  const render = () => {
    const arr = []
    for(let i = 1; i <= 10; i++){
      arr.push(<ResultRaitingButton key={`ResultRaitingButton_${i}`} index={i} changeRatingValue={changeRatingValue} dataValue={ratingValue}/>)
    }
    return arr
  }

  const sendRating = () => {
    if( ratingValue < 0 || id === undefined){
      return
    }
    setModalSendRating(true)
    axios.post(`/api/setRating`, {
      id: id,
      rating: ratingValue
    })
    .then(res => {
      setRatingSent(true)
      setModalSendRating(false)
    })
    .catch(err => {
      setModalSendRating(false)

    })
  }

  return ( 
    <div className="mt-8 flex flex-col items-center">
      <div 
        className={`
          ${modalSendRating ? 'block' : 'hidden'} absolute inset-0 bg-white z-10
        `}
      >
        
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <MainTitle title={data.title || ''}/>
        <img src="./resultTitle.svg" alt="#" />
      </div>
      <div className="text-center mt-4 md:mt-14 w-[90%]">
        <Paragraph description={data.description || ''}/>
      </div>
      <div className="mt-12 flex flex-col items-center gap-4">
        <h3 className="text-xl text-slate-600">
          Rate the test
        </h3>
        <div className="flex items-center gap-2 md:gap-4">
          {render()}
        </div>
        <div 
          onClick={() => sendRating()}
          className={`${ratingSent > 0 ? 'hidden' : ''}`}>
          <Button handleClick={sendRating} validationValue={ratingValue > 0} titleValue='Submit'/>
        </div>

      </div>
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <Link href='/' className="p-2 md:p-4 font-light underline">Return to the main page</Link>
        <Link href='/userProfile' className="p-2 md:p-4 font-light underline">More tests from the author</Link>
      </div>
    </div>
  );
}
 
export default ResultPage;