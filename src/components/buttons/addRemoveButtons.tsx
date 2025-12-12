"use client"

import { animeContexProvider, animesContext } from "@/components/providers/animeListProvider";
import { useContext, useEffect, useState } from "react";
import { AnimeData } from "@/lib/api";
import "./actionButtons.css"

export default function AddRemoveButtons({anime} : {anime: AnimeData}){
    const ctx = useContext<animeContexProvider | null>(animesContext);
    const [ hasAdd, setHasAdd ] = useState<boolean>(false);
    
    if(!ctx) throw Error("ERROR");
    
    const { myList, setMyList } = ctx;

    const buttonhandler = () : void => {
        const aux = myList!.filter(e => !exist(e));

        if(!hasAdd)
            setMyList(prev => (prev == null) ? [anime] : [...prev, anime] );
        else
            setMyList(aux);
        
        setHasAdd(prev => !prev);
    }

    const exist = (e: AnimeData) : boolean => ( anime.title.toLowerCase() === e.title.toLowerCase() );

  useEffect(() => {
        if (!myList) {
            setHasAdd(false);
            return;
        }

        const exists = myList.some(e => exist(e));
        setHasAdd(exists);
    }, [myList]);

    return (
        <button className="addRemove" onClick={()=>buttonhandler()} aria-label="adicionar para a lista">
            {!hasAdd ? "+ Add" : "Remove"}
        </button>
    )
}