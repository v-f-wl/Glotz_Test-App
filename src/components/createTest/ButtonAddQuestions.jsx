const ButtonAddQuestions = ({clickButton, valid}) => {
  return ( 
    <div 
      onClick={clickButton}
      className={`
        ${valid ? '' : 'opacity-25'}
        inline-block 
        py-2 
        px-8 
        border 
        border-green-900 
        rounded-md 
        cursor-pointer
        font-medium
      `}
    >
      Продолжить
    </div>
  );
}
 
export default ButtonAddQuestions;