'use client'
import { useState } from 'react';
import { CiFilter } from 'react-icons/ci'
const FilterModal = () => {
  const [openModal, setOpenModal] = useState(false)
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
          ${openModal ? 'h-[400px]' : 'h-0'} 
          ${openModal ? 'top-[25px]' : 'top-[20px]'} 
          ${openModal ? 'border' : 'border-none'} 
          border-indigo-400
          transition-all
          absolute 
          right-0 rounded-md bg-white
          z-10 
          w-[400px] 
          overflow-hidden
        `}
      >

      </div>
    </div>
  );
}
 
export default FilterModal;