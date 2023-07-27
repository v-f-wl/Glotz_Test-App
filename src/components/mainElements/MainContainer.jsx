const MainContainer = ({children}) => {
  return ( 
    <main className="w-auto md:w-[650px] lg:w-[980px] pt-[80px] md:pt-[110px] lg:pt-[140px] mx-auto px-1 md:px-0">
      {children}
    </main>
  );
}
 
export default MainContainer;