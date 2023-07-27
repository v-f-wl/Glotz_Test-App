const TitleWithLine = ({title, linePosition}) => {
  return (  
    <div
      className={`
        flex 
        flex-col 
        gap-2
        ${linePosition ? 'items-center' : 'items-start'}
      `}
    >
      <h2 className="text-2xl md:text-4xl font-medium">
        {title}
      </h2>
      <div className="relative">
        <img src="./title-line.svg" alt="img" className="w-[100px] md:w-auto"/>
        <div className="absolute top-0 right-0 "></div>
      </div>
    </div>
  );
}
 
export default TitleWithLine;