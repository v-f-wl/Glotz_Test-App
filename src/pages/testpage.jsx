import HeaderContainer from '@/components/header/HeaderContainer';
import 'tailwindcss/tailwind.css';
import { Montserrat } from 'next/font/google'
import MainContainer from '@/components/mainElements/MainContainer';
import TestContainer from '@/components/testContainer/TestContainer';
const inter = Montserrat({ subsets: ['latin'] })


export default function TestPage(){
  return ( 
      <div className={inter.className}>
        <main className="min-h-screen relative break-words">
          <HeaderContainer/>
          <MainContainer>
            <TestContainer/>
          </MainContainer>
        </main>
      </div>
  );
}