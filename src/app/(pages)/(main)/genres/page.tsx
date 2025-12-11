"use client"

import AdvancedSearch from "@/components/modals/advancedSearch/advancedSearch";
import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import { usePathname, useSearchParams } from "next/navigation";
import { GenresData, genresData } from "@/lib/dataAnimes";
import { Anime } from "@/components/animes/anime/anime";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import styles from "./genres.module.css";
import Image from "next/image";


export default function Genres(){
    const [actived, setActived] = useState<undefined | {id: number, page: number, type: "tv" | "movie"}>();
    const [loading, setLoading]  = useState<boolean>(false);

    const [animes, setAnimes] = useState<AnimeData[]>([]);
    const [getMore, setGetMore] = useState<boolean>(false);
    const [config, setConfig] = useState<boolean>(false);

    const modalVersion = useRef<HTMLDivElement | null>(null);
    
    const { ref: desktopRef, inView: desktopInView } = useInView();
    const { ref: mobileRef, inView: mobileInView } = useInView();

    const params = useSearchParams();
    const pathname  = usePathname();

    // gets the animes for all type of requets

    useEffect(()=>{
        

        const newRequest = async () => {
            if(!actived) return; 

            if(actived.page == 1) setLoading(true);

            let animeParams : AnimeParams = {
                page: actived.page,
                type: actived.type,
                limit: 25,
            }

            if(actived.id !== 0) animeParams = {...animeParams, genres: [actived.id]}; // for all ones  without beeing the bests
            const newAnimes = await fetchAnimes({animeParams});

            if(newAnimes.length < 25 ) setGetMore(false); // cancels the loadMore case there is no more animes
            else if(!getMore && newAnimes.length === 25) setGetMore(true);


            setAnimes((prev: AnimeData[]) => (actived.page === 1) ? newAnimes : [...prev, ...newAnimes]);
            setLoading(false);
        }
            
        if(actived?.page === 1 || actived === undefined) // case the user switches the genres or to them
                window.scrollTo({ top: 0, behavior: 'smooth' });

       newRequest();

    },[actived])


    // for the mobile version but also works in the desktop

    useEffect(() => {
        setLoading(true);
        setAnimes([]);

        const id = Number(params.get("id"));

        const type_param = params.get("type");
        const type = (type_param !== "tv" && type_param !== "movie") ? "tv" : type_param;

        if (modalVersion.current && getComputedStyle(modalVersion.current).display === "flex" && !id) return; // mobile version control

        setActived({page: 1, id : (id) ? id : 0, type:  type});
    }, [pathname]);


    // gets more animes beaseded on the scroll

    useEffect(()=>{
        if((desktopInView || mobileInView) && actived){
            setActived( prev => {
                if(prev === undefined) return;
                return ({...prev, page: prev.page + 1});
            });
        }
    },[desktopInView, mobileInView]) // mobile and desktop use this function~


    return (
        <> 

            {/* DESKTOP GENRES */}
            <div className={styles.desktop_genres}> 

                {/* SIDEBAR */}
                <div className={styles.sidebar}>
                    <p className={(actived?.id === 0) ? styles.desktop_actived : ""} onClick={()=>setActived({id: 0, page: 1, type: "tv"})}>
                        Bests
                    </p>
                    
                    {
                        genresData && genresData.map((e: GenresData) => (
                            <p 
                                key={e.id} 
                                onClick={() =>setActived({id: e.id, page: 1, type: "tv"}) }
                                className={(actived?.id === e.id) ? styles.desktop_actived : ""}>
                                {e.genre}
                            </p>
                        ))
                    }
                </div>

                {/* ANIMES */}
                
                    { loading 
                        ? <div className={styles.loading}>
                                <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40}/>
                            </div>

                        : <div className={styles.helper}>
                            <div className={styles.desktop_genres_animes}>
                                {animes && animes.map((e: AnimeData,index: number)=>(
                                    <Anime key={index} info={{anime: e, width: "150px", height: "220px"}}/> )) }
                            </div> 

                            <div className={styles.loadMore} ref={desktopRef} style={{display: (getMore) ? "block" : "none"}}>
                                <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40}/>
                            </div>
                        </div>
                    }
              

                {/* CONFIG BUTTON */}
                <div className={styles.desktop_genres_config}>
                    <button className={styles.genres_config_icon} onClick={()=> setConfig(true)} />
                </div>
            </div>


            {/* MOBILE GENRES */}
            <div className={styles.mobile_genres} ref={modalVersion}>
                
                { (actived === undefined)
                    ? 
                        <>
                            <p onClick={()=>setActived({id: 0, page: 1, type: "tv"})}>Bests</p>

                            { genresData && genresData.map((e)=>(
                                <p 
                                    key={e.id} 
                                    onClick={() => setActived({id: e.id, page: 1, type: "tv"})}>{e.genre}</p> )) }
                        </>

                    :  loading 
                            ? <div className={styles.loadingMobile}>
                                    <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40}/>
                                </div>
                            :
                            <div className={styles.helper}>
                                <div className={styles.mobile_genres_animes}>
                                    { animes && animes.map((e : AnimeData, index : number)=>(
                                        <Anime key={index} info={{anime: e, width: "150px", height: "220px"}} /> )) }
                                </div>

                                <div className={styles.loadMore} ref={mobileRef} style={{display: (getMore) ? "block" : "none"}}>
                                    <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40} />
                                </div>
                                

                                <div className={styles.mobile_genres_config}>
                                    <button className={styles.genres_back_icon} onClick={() => setActived(undefined)} />
                                    <button className={styles.genres_config_icon} onClick={()=> setConfig(true)} />
                                </div>
                            </div>
                    
                        
                }
            </div>

            <AdvancedSearch config={config} setConfig={setConfig} params={{page: 1, type: "tv", limit: 25}} />
        </>
    )
}