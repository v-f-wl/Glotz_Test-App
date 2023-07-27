import HeaderContainer from '@/components/header/HeaderContainer';
import 'tailwindcss/tailwind.css';
import { Montserrat } from 'next/font/google'
import MainContainer from '@/components/mainElements/MainContainer';
import CreateTest from '@/components/createTest/CreateTest';
const inter = Montserrat({ subsets: ['latin'] })


export default function TestPage(){
  return ( 
      <div className={inter.className}>
        <main className="break-words">
          <HeaderContainer/>
          <MainContainer>
            <CreateTest/>
          </MainContainer>
        </main>
      </div>
  );
}