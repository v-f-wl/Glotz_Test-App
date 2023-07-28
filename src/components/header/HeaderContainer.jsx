'use client'
import { useEffect, useState } from "react";
import LogoHeader from "./LogoHeader";
import NavHeader from "./NavHeader";

const HeaderContainer = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (  
    <div 
      className={`
        fixed
        z-30
        w-full
        px-1
        flex 
        items-center 
        justify-between 
        transition-all

        ${scrollY > 16 ? 'shadow' : ''}
        bg-white z-10

        ${scrollY > 16 ? 'lg:py-2' : 'lg:py-11'}
        ${scrollY > 16 ? 'py-2' : 'py-6'}
        md:px-9
      `}
    >
      <LogoHeader/>
      <NavHeader/>
    </div>
  );
}
 
export default HeaderContainer;