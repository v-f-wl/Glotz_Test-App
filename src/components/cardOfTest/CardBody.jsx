import { CiRead, CiFaceSmile, CiGrid41 } from 'react-icons/ci'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CardBody = ({id, title, description, watchings, ratingResult, category}) => {
  const router = useRouter()
  return ( 
    <div 
      onClick={() => router.push(`/testpage/?id=${id}`)}
      className="flex flex-col gap-4 border border-teal-700 p-3 md:p-6 rounded-md shadow-md transition-all hover:shadow-green-800/40"
    >
      <h3 className="font-bold text-xl md:text-3xl text-slate-600 max-h-[55px] md:max-h-[65px] overflow-hidden">
        {title}
      </h3>
      <span className="text-slate-500 max-h-[92px] md:h-[90px] overflow-hidden">
        {description}
      </span>
      <div className="flex items-center gap-4 mt-auto text-slate-500">
        <div className="flex items-center gap-2">
          <CiRead size={20}/>
          <span className="text-sm">{watchings}</span>
        </div>
        <div className="flex items-center gap-2">
          <CiFaceSmile size={20}/>
          <span className="text-sm">{ratingResult === 0 ? '-' : ratingResult}</span>
        </div>
        <div className="flex items-center gap-2">
          <CiGrid41 size={20}/>
          <span className="text-sm">{category}</span>
        </div>
      </div>
    </div>
  );
}
 
export default CardBody;