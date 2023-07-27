const Button = ({handleClick, validationValue, titleValue}) => {

  const clickButton = () => {
    if(!!validationValue){
      handleClick()
    }else{
      return
    }
  }
  return ( 
    <div 
      onClick={() => clickButton()}
      className={`
        ${validationValue === false ? 'opacity-30' : ''}
        ${validationValue === true ? 'hover:border-indigo-400' : ''}
        ${validationValue === true ? 'hover:text-indigo-400' : ''}
        border 
      border-green-950 
        rounded-md 
        inline-flex 
        px-3
        py-1 
        md:px-12 
        md:py-2 
        text-lg 
        md:text-2xl 
        transition 
        cursor-pointer
      `}
    >
      {!!titleValue && titleValue}
    </div>
  );
}
 
export default Button;