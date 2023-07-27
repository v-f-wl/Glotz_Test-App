'use client'
import Link from 'next/link';
import { CiRead,CiFaceSmile, CiGrid41, CiShare1} from 'react-icons/ci'
import Button from '../UI/Button';
import MainTitle from '../UI/MainTitle';
import Paragraph from '../UI/Paragraph';
const AboutTestPage = ({data, nextStep}) => {

  const convertDate = (dateValue) => {
    if(!dateValue){
      return ''
    }
    const date = new Date(dateValue);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const editData = date.toLocaleDateString('ru-RU', options);
    return editData;
  }
  return ( 
    <div className="mb-8">
      <MainTitle title={data.title}/>
      <div className="mt-6 flex items-center gap-4 text-slate-500 text-md md:text-xl">
        <Link href={`/userProfile/?id=${data.userId}`}>{data.user}</Link>
        <span>/</span>
        <div>{convertDate(data.createdAt)}</div>
      </div>
      <div className="mt-2 flex items-center gap-6 text-slate-500 text-md">
        <div className="flex items-center gap-1">
          <CiRead size={24}/>
          <span>{data.watchings}</span>
        </div>
        <div className="flex items-center gap-1">
          <CiFaceSmile size={24}/>
          <span>{data.ratingResult === 0 ? '-' : data.ratingResult}</span>
        </div>
        <div className="flex items-center gap-1">
          <CiGrid41 size={24}/>
          <span>{data.category}</span>
        </div>
      </div>
      <div className="mt-4 md:mt-10">
        <Paragraph description={data.description}/> 
      </div>
      <div className="mt-4 md:mt-6 text-slate-500 text-md md:text-xl flex items-center gap-2">
        <span>Количество вопросов:</span>{data.questionsCount}
      </div>
      <div className="mt-8 md:mt-16 block md:flex md:items-center md:gap-8">
        <Button handleClick={nextStep} validationValue={true} titleValue='Пройти тест'/> 
        <div className="mt-6 md:mt-0 flex md:flex items-center md:justify-center gap-2 md:gap-4 cursor-pointer transition hover:text-blue-700">
          <CiShare1 size={24}/>
          <span>Поделиться тестом</span>
        </div>
      </div>
    </div>
  );
}
 
export default AboutTestPage;