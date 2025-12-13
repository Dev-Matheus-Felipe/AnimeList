"use client"

import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import AnimeSection from "../animes/animesSection/animeSection";
import { useInView } from "react-intersection-observer";
import styles from "./controlerLoading.module.css";
import { genresData } from "@/lib/dataAnimes";
import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";

type LoadedAnime = {
    title: string;
    animes: AnimeData[];
}

type State = {
    loadedAnimes: LoadedAnime[],
    currentIndex: number,
 }

 type Action = {
    type: "nextSection", 
    payload?: {title: string, animes: AnimeData[]}
 }

const animeSectionReducer = (state : State , action : Action) : State => {
    switch(action.type){
        case "nextSection":
            if(!action.payload) return state;

            return {
                ...state, 
                currentIndex: state.currentIndex + 1, 
                loadedAnimes: [...state.loadedAnimes, action.payload ],
            };
        
        default: return state;
        
    }
}

export default function ControlerLoading({ type, startIndex }: { type: "tv" | "movie", startIndex: number }) {
    const [ state, dispatch ] = useReducer(animeSectionReducer, {
        loadedAnimes: [],
        currentIndex: startIndex,
    });

    const [ loading, setLoading ] = useState<boolean>(false);

    const { ref, inView } = useInView();


    useEffect(() => {
        const getSection = async() => {
            
            const genre = genresData[state.currentIndex];

            const animeParams: AnimeParams = {
                type,
                page: 1,
                limit: 10,
                genres: [genre.id],
            };

           const data : AnimeData[] = await fetchAnimes({ animeParams });
            if(data) dispatch({type: "nextSection", payload: { title: genre.label, animes: data }})
        }

        if (inView && state.currentIndex < genresData.length && !loading ){
            setLoading(true);
            getSection();

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [inView, state.currentIndex, type, loading]);

    return (
        <>
           {
                state.loadedAnimes && state.loadedAnimes.map((section: LoadedAnime, i: number) => {
                    const genre = genresData[startIndex + i];
                    if (!genre) return null;

                    return (
                        <AnimeSection
                            key={i}
                            info={{
                                title: section.title,
                                animes: section.animes ?? [],
                                type,
                                genre: genre.id
                            }}
                        />
                    )
                })
           }

            { state.currentIndex < genresData.length  && (
                <div className={styles.loadMore} ref={ref}>
                    <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40} />
                </div>
            )}
        </>
    );
}
