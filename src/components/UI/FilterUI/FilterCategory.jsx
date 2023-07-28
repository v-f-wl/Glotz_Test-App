import { category } from "@/templates/category";
import { useEffect, useState } from "react";

const FilterCategory = ({handleChange, filterValue}) => {
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    handleChange('category', selectedTag)
  }, [selectedTag, handleChange])
  
  useEffect(() => {
    if(filterValue !== selectedTag){
      setSelectedTag(filterValue)
    }
  }, [filterValue, selectedTag])

  const changeTag = (value) => {
    if(selectedTag === value){
      setSelectedTag('')
    }else{
      setSelectedTag(value)
    }
  }
  const renderTag = () => {
    const arr = []
    const Tag = ({value}) => (
      <div 
        onClick={() => changeTag(value)}
        className={`
          border
          ${selectedTag === value ? 'border-indigo-400' : 'border-green-600'}
          ${selectedTag === value ? 'text-indigo-400' : ''}
          cursor-pointer p-2 rounded-lg transition-all font-medium
        `}
      >
        {value}
      </div>
    )
    for(let item of category){
      arr.push(<Tag key={item} value={item}/>)
    }
    return arr
  }
  return (  
    <div className="flex flex-wrap gap-3">
      {renderTag()}
    </div>
  );
}
 
export default FilterCategory;