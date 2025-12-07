"use client"

import { fetchAnimes, AnimeData, AnimeParams } from "@/lib/api";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import styles from "./animeSection.module.css";
import { useRouter } from "next/navigation";
import { Anime } from "../anime/anime";

type State = {
    animes: AnimeData[],
    page: number,
    backButton: boolean,
    nextButton: boolean
}

type info = {
    title: string,
    animes: AnimeData[], 
    type: "tv" | "movie",
    genre: number
}

export default function AnimeSection({info} : {info: info}){
    const [state, setState] = useState<State>({
        animes: info.animes,
        page: 2,
        backButton:false,
        nextButton: true
    });

    const sectionRef = useRef< HTMLDivElement | null>(null);
    const {ref, inView} = useInView();
    const router = useRouter();

    // carousel and new requests configuration

    const request = async (counter: number): Promise<void> => {
        const el = sectionRef.current;
        if (!el) return;

        let backButton = state.backButton, nextButton = state.nextButton;

        // back click

        if (counter === -1) {  
            el.scrollLeft = Math.max(0, el.scrollLeft - el.clientWidth);

            if(Math.max(0, el.scrollLeft - el.clientWidth) == 0) 
                setState((prev: State) => ({...prev, backButton: false}));

            return;

        } else if(counter == 1 && !state.backButton) backButton = true;

        const getMore = Math.floor(el.scrollLeft + el.clientWidth + 300) >= el.scrollWidth; 

        // case user is at the end

        if (getMore) { 
            const animeParams: AnimeParams = {
                page: state.page,
                type: info.type,
                genres: [info.genre],
                limit: 10,
            };

            const data = await fetchAnimes({ animeParams });
            if (data.length < 10) backButton = false;
            
            setState(prev => ({
                animes: [...prev.animes, ...data],
                page: prev.page + 1,
                backButton: backButton,
                nextButton: nextButton
            }));
            
        } else el.scrollLeft = Math.min(el.scrollLeft + el.clientWidth, el.scrollWidth); 
    };

    // att the carousel state

    useEffect(()=>{
        const el = sectionRef.current;

        if(el && state.page > 2)
            el.scrollLeft = Math.min(el.scrollLeft + el.clientWidth, el.scrollWidth);

    },[state.animes]);

    return(
        <div className={styles.anime_section}>
            <div className={styles.title_container}>
                <h3>{info.title}</h3>
                {inView && <p onClick={() => router.push(`/genres?id=${info.genre}`) }>View More</p>}
            </div>

            <div className={styles.carousel} ref={sectionRef}>
                <button
                    className={styles.backButton}
                    style={{visibility: (state.backButton) ? "visible" : "hidden" }} 
                    disabled={state.page === 1}
                    onClick={() => request(-1)} />

                <button
                    className={styles.nextButton}
                    style={{visibility: (state.nextButton) ? "visible" :"hidden"  }} 
                    disabled={!state.nextButton}
                    onClick={() => request(1)} />

                { state.animes && state.animes.map((e : AnimeData,index : number) => 
                    <Anime key={index} info={{anime: e, width: "120px", height: "180px"}} /> )}

                <div className={styles.viewMore_obj} ref={ref} />
            </div>
        </div>           
    )
}