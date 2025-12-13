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
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<State>({
        animes: info.animes,
        page: 2,
        backButton:false,
        nextButton: true
    });

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const {ref, inView} = useInView();
    const router = useRouter();

    // carousel and new requests configuration

    // goBack

    const goBack = (el: HTMLDivElement) : void => {
        el.scrollLeft = Math.max(0, el.scrollLeft - el.clientWidth);

        setState(prev => ({
            ...prev,
            backButton: (Math.max(0, el.scrollLeft - el.clientWidth) == 0) ? false : true,
            nextButton: true
        }))
    }


    // goNext

    const goNext = async (el: HTMLDivElement) : Promise<void> => {
        const getMore = Math.floor(el.scrollLeft + el.clientWidth + 300) >= el.scrollWidth; 
        let backButton = state.backButton, nextButton = state.nextButton;

        if(!backButton) backButton = true;
        // case user is at the end

        if (getMore && !loading) { 
            setLoading(true);
            const animeParams: AnimeParams = {
                page: state.page,
                type: info.type,
                genres: [info.genre],
                limit: 10,
            };

            const data = await fetchAnimes({ animeParams });
            if(data.length < 10) nextButton = false;
            
            setState(prev => ({
                animes: [...prev.animes, ...data],
                page: prev.page + 1,
                backButton: backButton,
                nextButton: nextButton
            }));
            
        } else 
            el.scrollLeft = Math.min(el.scrollLeft + el.clientWidth, el.scrollWidth); 
    }


    // request

    const request = (counter: number): void => {
        const el = sectionRef.current;
        if (!el) return;

        if (counter === -1) 
            goBack(el);

        else 
            goNext(el);
    };

    // att the carousel state

    useEffect(()=>{
        const el = sectionRef.current;

        if(el && state.page > 2){
            setLoading(false);
            el.scrollLeft = Math.min(el.scrollLeft + el.clientWidth, el.scrollWidth);
        }

    },[state.animes]);

    useEffect(()=>{
        if(info.animes.length < 10) setState((prev: State) => ({...prev, nextButton: false}))
    },[])

    return(

        /* ANIME SECTION */
        <div className={styles.anime_section}>
            <div className={styles.title_container}>
                <h3>{info.title}</h3>
                {inView && <p onClick={() => router.push(`/genres?id=${info.genre}&type=${info.type}`) }>View More</p>}
            </div>

            {/* CAROUSEL */}
            <div className={styles.carousel} ref={sectionRef}>
                <button
                    aria-label="go back carousel"
                    className={styles.backButton}
                    style={{visibility: (state.backButton) ? "visible" : "hidden" }} 
                    disabled={state.page === 1}
                    onClick={() => request(-1)} />

                <button
                    aria-label="get next carousel"
                    className={styles.nextButton}
                    style={{visibility: (state.nextButton && !loading) ? "visible" :"hidden"  }} 
                    disabled={!state.nextButton}
                    onClick={() => request(1)} />

                { state.animes && state.animes.map((e : AnimeData,index : number) => 
                    <Anime key={index} info={{anime: e, width: "120px", height: "180px"}} /> )}

                <div className={styles.viewMore_obj} ref={ref} />
            </div>
        </div>           
    )
}