'use client'
import { CiSearch } from 'react-icons/ci'

const SearchItem = () => {
  return (  
    <form className="flex border-b border-black">
      <input type="text" className="outline-none" placeholder="Введите никнейм"/>
      <div className="w-[24px] h-[24px] cursor-pointer">
        <CiSearch size={18}/>
      </div>
    </form>
  );
}
 
export default SearchItem;