"use client"

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimeData } from "@/lib/api";

export type animeContexProvider = {
    myList: AnimeData[] | null,
    setMyList: Dispatch<SetStateAction<AnimeData[] | null>>
}

export const animesContext = createContext<animeContexProvider | null>(null);

export default function AnimeListProvider({children} : {children : React.ReactNode}){
    const [myList, setMyList] = useState<AnimeData[] | null>(null);


    // Saves the changes made

    useEffect(()=>{
        if(myList !== null)  localStorage.setItem("myList", JSON.stringify(myList));   
    },[myList])


    // initializes the list

    useEffect(()=>{
        const data = localStorage.getItem("myList");

        if (data) setMyList(JSON.parse(data));
        else setMyList([]); 
    },[])

    return (
        <animesContext.Provider value={{myList,setMyList}}>
            {children}
        </animesContext.Provider>
    )
}