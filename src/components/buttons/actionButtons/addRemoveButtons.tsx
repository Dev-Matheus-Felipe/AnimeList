"use client"

import { animeContexProvider, animesContext } from "@/components/providers/animeListProvider";
import { useContext, useEffect, useState } from "react";
import { AnimeData } from "@/lib/api";
import "./actionButtons.css"

export default function AddRemoveButtons({ anime } : { anime: AnimeData }){

    const ctx = useContext<animeContexProvider | null>(animesContext);
    const [ hasAdd, setHasAdd ] = useState<boolean>(false);
    
    if(!ctx) throw Error("Erro no provedor");
    
    const { myList, setMyList } = ctx;

    const buttonhandler = () : void => {
        const aux = myList!.filter( e => !exist(e) );

        if(!hasAdd)
            setMyList(prev => (prev == null) ? [anime] : [...prev, anime] );
        else
            setMyList(aux);
        
        setHasAdd(prev => !prev);
    }

    const exist = (e: AnimeData) : boolean => ( anime.title === e.title );

    useEffect( ()=>{
        if(myList){
            let count = 0;

            // update the buttons whenever the list changes

            myList.map((e) => {
                if(exist(e)) setHasAdd(true); 
                count++;
            });

            if(count === 0) setHasAdd(false);
        } 
    },[myList]);

    return (
        <button className="button" onClick={()=>buttonhandler()}>{!hasAdd ? "+ Add" : "Remove"}</button>
    )
}