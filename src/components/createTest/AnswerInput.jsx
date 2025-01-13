const AnswerInput = ({index, handleAnswerChange}) => {

  return ( 
    <li className="flex items-center gap-4">
      <span className="w-[15px]">{index}.</span>
      <input 
        onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
        type="text" 
        placeholder='Answer'
        className='outline-none w-full border-b'
      />
    </li>
  );
}
 
export default AnswerInput;