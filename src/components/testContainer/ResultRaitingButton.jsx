
const ResultRaitingButton = ({index, dataValue, changeRatingValue}) => {

  return ( 
    <div 
      onClick={() => changeRatingValue(index)}
      className={`
        ${index === dataValue ? 'bg-green-800' : ''}
        ${index === dataValue ? 'text-white' : ''}
        w-[25px]
        h-[36px]
        md:w-[40px]
        md:h-[58px]
        flex items-center justify-center
        border 
        border-green-800 
        rounded-lg
        font-bold 
        text-md
        md:text-xl 
        text-green-800 
        cursor-pointer
      `}
    >
      {index}
    </div>
  );
}
 
export default ResultRaitingButton;