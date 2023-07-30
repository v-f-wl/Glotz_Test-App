'use client'
import { useEffect, useState } from "react";
import CardBody from "../cardOfTest/CardBody";
import axios from "axios";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "@/redux/filter/filter-slice";

const MainWalls = () => {
  const [tests, setTests] = useState()
  const [haventTests, setHaventTests] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [moreData, setMoreData] = useState(true)
  const filterParams = useSelector(state => state.filterReducer.value);
  const dispatch = useDispatch()

  useEffect(() => {
    if(filterParams.rating === '' && filterParams.category === ''){
      setPageCount(1)
    }
    axios.post('/api/getPreviewTest', {...filterParams, pageCount: 1})
    .then(res => {
      setMoreData(res.data.hasMore)
      console.log(res.data)
      if(res.data.tests.length > 0 ){
        setTests(res.data.tests)
        setHaventTests(false)
        setPageCount(prev => prev = prev + 1)
      }else{
        setTests(undefined)
        setPageCount(prev => prev = prev + 1)
        setHaventTests(true)
      }
    })
  }, [filterParams])

  const getMoreTests = () => {
    axios.post('/api/getPreviewTest', {...filterParams, pageCount})
    .then(res => {
      setTests(prev => {
        const arr = [...prev, ...res.data.tests]
        return arr
      })
      setMoreData(res.data.hasMore)
    })
    setPageCount(prev => prev = prev + 1)
  }
  return ( 
    <div className="mt-4 lg:mt-8 mb-4">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-10">
        {tests !== undefined  ? 
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
              <div className={`${haventTests && 'hidden'} h-[20vh] col-span-2  w-full flex flex-col justify-center items-center`}>
                Загрузка...
              </div>
            )
        }
        {haventTests && (
          <div className="w-full h-full max-h-[300px] col-span-2 mt-10 md:mt-24 flex flex-col items-center gap-8 justify-center">
            <h3 className="font-bold text-2xl md:text-4xl text-center">Тесты не найдены</h3>
            <Button handleClick={() => dispatch(resetFilter())} validationValue={true} titleValue='Сбросить фильтр'/>
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        {moreData ? 
          <Button handleClick={getMoreTests} validationValue={true} titleValue="Больше тестов"/>
        :
          null
        }
      </div>
    </div>
  );
}
 
export default MainWalls;