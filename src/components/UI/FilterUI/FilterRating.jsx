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
      <RatingItem title='Рейтинг от 9' rating='9'/>
      <RatingItem title='Рейтинг от 8' rating='8'/>
      <RatingItem title='Рейтинг от 7' rating='7'/>
      <RatingItem title='Рейтинг от 6' rating='6'/>
    </div>
  );
}
 
export default FilterRating;