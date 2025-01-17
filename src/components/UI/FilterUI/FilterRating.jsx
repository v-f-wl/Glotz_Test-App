'use client'
import { useEffect, useState } from "react";

const FilterRating = ({handleChange, filterValue}) => {
  const [handleValue, setHandleValue] = useState('')

  useEffect(() => {
    handleChange('rating', handleValue)
  },[handleValue])

  useEffect(() => {
    if(filterValue !== handleValue){
      setHandleValue(filterValue)
    }
  }, [filterValue])

  const RenderRatingItem = () => {
    const resultArr = []
    for(let i = 9; i >= 6; i--){
      resultArr.push(<RatingItem key={`RatingItem${i}`} title={`Rating from ${i}`} rating={i}/>)
    }
    return resultArr
  }
  const changeHandleValue = (value) => {
    if(handleValue === value){
      setHandleValue('')
    }else{
      setHandleValue(value)
    }
  }
  const RatingItem = ({title, rating}) => {
    return (
      <div 
        onClick={() => changeHandleValue(rating)}
        className={`
          ${handleValue === rating ? 'border-indigo-400' : 'border-green-800'}
          ${handleValue === rating ? 'text-indigo-400' : 'text-slate-800'}
          border p-2 rounded-lg transition-all flex items-center gap-2
          cursor-pointer font-medium
        `}
      >
        {title}
      </div>
    )
  }
  return ( 
    <div className="flex flex-col gap-3">
      <RenderRatingItem/>
    </div>
  );
}
 
export default FilterRating;