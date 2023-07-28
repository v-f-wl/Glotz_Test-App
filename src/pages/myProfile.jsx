import HeaderContainer from '@/components/header/HeaderContainer';
import 'tailwindcss/tailwind.css';
import { Montserrat } from 'next/font/google'
import MainContainer from '@/components/mainElements/MainContainer';
import ProfileContainer from '@/components/userProfile/ProfileContainer';
import { ReduxProvider } from '@/redux/Provider';
const inter = Montserrat({ subsets: ['latin'] })


export default function TestPage(){
  return ( 
    <ReduxProvider>
      <div className={inter.className}>
        <main className="break-words">
          <HeaderContainer/>
          <MainContainer>
            <ProfileContainer/>
          </MainContainer>
        </main>
      </div>
    </ReduxProvider>
  );
}