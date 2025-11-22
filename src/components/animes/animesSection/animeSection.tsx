"use client"

import { fetchAnimes, AnimeData, AnimeParams } from "@/lib/api";
import { useEffect, useState } from "react";
import { Anime } from "../anime/anime";
import "./animeSection.css";

export default function AnimeSection({ route, index } : {route: "home" | "movies", index : number}){
    const [animes, setAnimes] = useState<AnimeData[]>([]);
    const [page, setPage] = useState<number>(1);

    const genres : number[]  = [1, 41, 22, 62];
    const section_titles : string[] = [
        "Action for the whole family",
        "Unravel the Mystery",
        "Love in Every Season",
        "Into Another Life"
    ];

    const request = async () => {
        const animeParams : AnimeParams = {
            page: page, 
            type: (route === "home") ? "tv" : "movie", 
            genres: [genres[index]],
            limit : 10,

        }
    
        const data  : AnimeData[] = await fetchAnimes({animeParams});

        setAnimes(data);
        setPage(prev => prev + 1);
    }

    useEffect(()=>{
        request();
    },[])

    return(
        <div className="anime_section">
            <h3>{section_titles[index]}</h3>
            <div className="carousel" >
                {
                    (animes.length > 0) 
                        && animes.map((e,index)=>(
                            <Anime key={index} anime={e} /> ))
                }
               
            </div>
        </div>
    )
}