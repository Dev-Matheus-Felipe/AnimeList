"use client"

import { animeContexProvider, animesContext } from "@/components/providers/animeListProvider";
import { Anime } from "@/components/animes/anime/anime";
import { AnimeData } from "@/lib/api";
import { useContext } from "react";
import "./my-list.css";

export default function MyList(){
    const ctx = useContext<animeContexProvider | null>(animesContext);
    if(!ctx) throw Error("qualquer erro qualquer");

    const { myList } = ctx; 

    return(
        <div className="myList_Container">
            <h1>My List</h1>
            <div className="myList">
                {
                    (myList && myList.length > 0) 
                        ? myList.map((e : AnimeData, index : number) =>(
                            <Anime key={index} anime={e} /> ))

                        : <p>No anime added yet.</p>
                }
            </div>
        </div>
    )
}