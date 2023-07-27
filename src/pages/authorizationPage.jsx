import 'tailwindcss/tailwind.css';
import { Montserrat } from 'next/font/google'
import AuthorizationScreen from '@/components/authorization/AuthorizationScreen';
import Link from 'next/link';
const inter = Montserrat({ subsets: ['latin'] })


export default function TestPage(){
  return ( 
      <div className={inter.className}>
        <main className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 h-screen break-words">
          <Link href="/" className="lg:w-[20%] font-bold text-4xl md:text-6xl text-green-900">Glötz</Link>
          <div className="w-[90%] lg:w-[20%]">
            <AuthorizationScreen/>
          </div>
        </main>
      </div>
  );
}