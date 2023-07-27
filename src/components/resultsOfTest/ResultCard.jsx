import axios from "axios";
import { useEffect, useState } from "react";

const ResultCard = ({id, title, description}) => {
  return ( 
    <div className={`border border-green-800 rounded-lg p-2 md:p-4 flex-col gap-4`}>
        <div className="text-xl md:text-2xl text-green-800 font-bold">
          {title !== undefined && title}
        </div>
        <div className="text-md md:text-xl text-slate-800 font-medium">
          {description !== undefined && description}
        </div>
    </div>
  );
}
 
export default ResultCard;