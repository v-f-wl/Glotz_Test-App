import MainContainer from "@/components/mainElements/MainContainer";
import MainTop from "@/components/mainElements/MainTop";
import HeaderContainer from "@/components/header/HeaderContainer";
import 'tailwindcss/tailwind.css';
import MainWalls from "@/components/mainElements/MainWalls";

export default function Home() {
  return (
    <main className="">
      <HeaderContainer/>
      <MainContainer>
        <MainTop/>
        <MainWalls/>
      </MainContainer>
    </main>
  )
}
