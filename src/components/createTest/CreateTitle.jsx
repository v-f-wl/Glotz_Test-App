'use client'

import { useEffect, useState } from "react";
import Button from "../UI/Button";

const CreateTitle = ({titleData, nextStep, descriptionData}) => {
  const [titleValue, setTitleValue] = useState(titleData)
  const [description, setDescription] = useState(descriptionData)
  const [muteButton, setMuneButton] = useState(false)

  const Title = ({title}) => {
    return (
      <h3 className="text-xl font-medium text-slate-600">
        {title}
      </h3>
    )
  }
  useEffect(() => {
    if(titleValue.length > 10 && description.length > 20){
      setMuneButton(true)
    }else{
      setMuneButton(false)
    }
  }, [titleValue,description])
  const validetion = () => {
    if(titleValue.length > 10 && description.length > 20){
      nextStep(titleValue, description)
    }else{
      return
    }
  }
  return ( 
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4">
        <Title title='1.Write the test title'/>
        <input 
          key="title"
          id='title'
          type="text" 
          name='title'
          className="p-2 md:p-4 border border-green-800 rounded-lg w-full outline-none"
          onChange={(e) => setTitleValue(e.target.value)}
          value={titleValue}
          placeholder="Minimum 10 characters"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Title title="2.Write the test description"/>
        <textarea 
          key="description"
          id='description'
          type="text" 
          name='description'
          rows="4" 
          className="p-2 md:p-4 border border-green-800 rounded-lg w-full resize-none outline-none"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Minimum 20 characters"
        >
        </textarea>
      </div>
      <div className="flex justify-center gap-8">
        <Button 
          handleClick={validetion}
          validationValue={muteButton}
          titleValue='Continue'
        />
      </div>
    </div>
  );
}
 
export default CreateTitle;