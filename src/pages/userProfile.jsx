import 'tailwindcss/tailwind.css';
import HeaderContainer from '@/components/header/HeaderContainer';
import { Montserrat } from 'next/font/google'
import MainContainer from '@/components/mainElements/MainContainer';
import UserContainer from '@/components/userProfile/UserContainer';
const inter = Montserrat({ subsets: ['latin'] })

export default function userProfile(){
  return ( 
      <div className={inter.className}>
        <main className="break-words">
          <HeaderContainer/>
          <MainContainer>
            <UserContainer/>
          </MainContainer>
        </main>
      </div>
  );
}