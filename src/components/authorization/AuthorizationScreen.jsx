'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import LogInScreen from "./LogInScreen";
import SingInScreen from "./SingInScreen";

const AuthorizationScreen = () => {
  const [singIn, setSingIn] = useState(false)
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if(id === 'signin'){
      setSingIn(true)
    }
  }, [id])
  return ( 
    <div className="">
      {singIn ? 
        (
          <SingInScreen
            changeScreen={() => setSingIn(false)}
          />
        )
        :
        (
          <LogInScreen
            changeScreen={() => setSingIn(true)}
          />
        )
      }
    </div>
  );
}
 
export default AuthorizationScreen;