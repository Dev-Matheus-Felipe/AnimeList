"use client"

import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import AnimeSection from "../animes/animesSection/animeSection";
import { useInView } from "react-intersection-observer";
import styles from "./controlerLoading.module.css";
import { genresData } from "@/lib/dataAnimes";
import { useEffect, useState } from "react";
import Image from "next/image";

let page = 3;

export default function ControlerLoading({type} : {type: "tv" | "movie"}){
    const [animes, setAnimes] = useState<{title: string, animes: AnimeData[]}[]>([]);

    const {ref, inView} = useInView();
    const data = genresData;

    useEffect(()=> {
        if(inView){
            const animeParams: AnimeParams = {
                type: type,
                page: 1,
                limit: 10,
                genres: [data[page].id],
            };
            
            fetchAnimes({ animeParams }).then((res : AnimeData[]) => {
                setAnimes( prev => (
                    [...prev, {title: data[page].genre, animes: res}]
                ))

                page++;
            });
        }
    },[inView])

    return(
        <>
            {
                animes && animes.map((e: {title: string; animes: AnimeData[]}, index: number) => (
                    <AnimeSection 
                        key={index} 
                        info={{title: data[index + 3].genre, animes: e.animes, type: type, genre: data[index +3].id}} />
                ))
            }

            <div className={styles.loadMore} ref={ref}>
                <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40}/>
            </div>
        </>
    )
}