"use client"

import { UserData } from "@/app/(pages)/profile/page";
import { createContext, SetStateAction, useEffect, useState } from "react";


 type UserContext = {
  userContext: UserData | null;
  setUserContext: React.Dispatch<SetStateAction<UserData | null>>;
};

export const UserDataContext = createContext<UserContext | null>(null);

export default function ProfilePictureProvider({children} : {children: React.ReactNode}){
    const [userContext, setUserContext] = useState<UserData | null>(null);

    useEffect(()=>{
        if(userContext !== null) localStorage.setItem("user_data", JSON.stringify(userContext));

    },[userContext]);

    useEffect(()=>{
        const data = localStorage.getItem("user_data");

        if (data) setUserContext(JSON.parse(data));
    },[])

    return (
        <UserDataContext.Provider value={{userContext, setUserContext}}>
            {children}
        </UserDataContext.Provider>
    )
}