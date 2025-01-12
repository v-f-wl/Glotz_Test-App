import TitleWithLine from "../UI/TitleWithLine";
import MainFilter from "./MainFilter";

const MainTop = () => {
  return (  
    <div className="flex items-center justify-between">
      <TitleWithLine
        title='Tests'
        linePosition={false}
      />
      <MainFilter/>
    </div>
  );
}
 
export default MainTop;