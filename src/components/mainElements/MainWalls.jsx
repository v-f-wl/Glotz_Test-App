'use client'
import { useEffect, useState } from "react";
import CardBody from "../cardOfTest/CardBody";
import axios from "axios";
import Button from "../UI/Button";

const MainWalls = () => {
  const [tests, setTests] = useState()

  useEffect(() => {
    axios.get('/api/getPreviewTest')
    .then(res => setTests(res.data))
  },[])

  return ( 
    <div className="mt-4 lg:mt-8 mb-4">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-10">
        {tests !== undefined ? 
        (tests.map(item => (
            <CardBody
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              watchings={item.watchings}
              ratingResult={item.ratingResult}
              category={item.category}
            />
          ))) 
          : 
          (
            <div className="h-[20vh] col-span-2  w-full flex flex-col justify-center items-center">
              Загрузка...
            </div>
          )
        }
      </div>
      <div className="mt-8 flex justify-center">
        <Button handleClick validationValue={true} titleValue="Больше тестов"/>
      </div>
    </div>
  );
}
 
export default MainWalls;