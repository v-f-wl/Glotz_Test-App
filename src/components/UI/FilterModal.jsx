'use client'
import { useEffect, useState } from 'react';
import { CiFilter, CiCircleRemove } from 'react-icons/ci'
import { resetFilter, changeCategory } from '@/redux/filter/filter-slice';
import { useDispatch, useSelector } from 'react-redux';
import FilterCategory from './FilterUI/FilterCategory';
import FilterRating from './FilterUI/FilterRating';
import Button from './Button';


const FilterModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const [buttonValid, setButtonValid] = useState(false)
  const [handleSettings, setHandleSettings] = useState({
    category: '',
    rating: ''
  })
  const filter = useSelector(state => state.filterReducer.value)
  const dispatch = useDispatch()

  useEffect(() => {
    setHandleSettings(filter)
  },[filter])

  useEffect(() => {
    if(handleSettings.category === '' && handleSettings.rating === ''){
      setButtonValid(false)
    }else{
      setButtonValid(true)
    }
  },[handleSettings])


  const updateSettings = (key, value) => {
    setHandleSettings(prev => {
      const obj = {...prev}
      obj[key] = value
      return obj
    })
  }

  const resetFilterModal = () => {
    dispatch(resetFilter())
    setHandleSettings(prev => {
      const obj = {...prev}
      obj.category = ''
      obj.rating = ''
      return obj
    })
    setOpenModal(false)
  }

  const sendValue = () => {
    dispatch(changeCategory(handleSettings))
    setOpenModal(false)
  }


  return ( 
    <div className="relative">
      <div 
        onClick={() => setOpenModal(prev => prev = !prev)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span>Фильтр</span>
        <CiFilter size={18}/>
      </div>
      <div 
        className={`
          ${openModal ? 'h-auto' : 'h-0'} 
          ${openModal ? 'top-[25px]' : 'top-[20px]'} 
          ${openModal ? 'border' : 'border-none'} 
          ${openModal ? 'border' : 'border-none'} 
          ${openModal ? 'p-2 ' : 'p-0'} 
          ${openModal ? 'md:p-4 ' : 'p-0'} 
          border-indigo-400
          transition-all
          absolute 
          right-0 
          rounded-md 
          bg-white 
          z-10 
          w-[300px] 
          md:w-[400px] 
          overflow-hidden 
        `}
      >
        <div 
          onClick={() => setOpenModal(false)}
          className="absolute top-3 right-3 cursor-pointer hover:text-indigo-400 transition"
        >
          <CiCircleRemove size={24}/>
        </div>
        <h3 className="text-xl md:text-2xl font-medium text-slate-900">
          Категория
        </h3>
        <div className="mt-3">
          <FilterCategory handleChange={updateSettings} filterValue={handleSettings.category}/>
        </div>
        <h3 className="mt-5 text-xl md:text-2xl font-medium text-slate-900">
          Рейтинг
        </h3>
        <div className="mt-3">
          <FilterRating handleChange={updateSettings} filterValue={handleSettings.rating}/>
        </div>
        <div className="mt-8 flex gap-4 items-center">

          <Button handleClick={() => sendValue()} validationValue={buttonValid} titleValue="Применить"/>
          <div
            onClick={resetFilterModal}
            className="cursor-pointer">Сбросить</div>
        </div>
      </div>
    </div>
  );
}
 
export default FilterModal;