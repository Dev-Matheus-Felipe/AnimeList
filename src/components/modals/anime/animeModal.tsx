"use client"

import { ModalContext, ModalContextType } from "../../providers/modalProvider"
import AddRemoveButtons from "../../buttons/addRemoveButtons";
import styles from "./animeModal.module.css";
import { useContext, useEffect, useState } from "react";
import { AnimeData } from "@/lib/api"
import Image from "next/image";

export default function Modal({anime} : {anime: AnimeData}){
    const ctx = useContext<ModalContextType | null>(ModalContext);
    if(!ctx) throw Error("ERROR");

    const [seeMore, setSeeMore] = useState<boolean>(true);

    const synopsis = anime.synopsis;
    const { setModal } = ctx;
    

    const closeMedal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement && e.target.id === "blur")
            setModal(null);
    };

    useEffect(() => {
        const body = document.querySelector("body") as HTMLBodyElement;
        body.style.overflow = "hidden";

        return () => {body.style.overflow = "auto"};
    },[])

    return (
        <div id="blur" onClick={closeMedal} className={styles.blur}>

            {/* MODAL */}
            <div className={styles.modal}>
                <button className={styles.close} onClick={()=>{setModal(null)} }/>

                <div className={styles.image_container}>
                    <Image 
                        className={styles.image} 
                        src={`${anime.large_image}`} 
                        alt="anime_modal_photo"
                        width={300}
                        height={350} />
                </div>

                {/* DESCRIPTION */}
                <div className={styles.description}>

                    {/* TITLE */}
                    <div className={styles.title_container}>
                        <p>{anime.title} <span>★ {anime.score}</span></p>
                    </div>

                    {/* GENRES */}
                    <div className={styles.genres_container}>
                        {
                            anime && anime.genres.map((e: string, index: number)=>(
                                <p className={styles.genre} key={index}>{e}</p> ))
                        }
                    </div>

                    {/* SYNOPSIS */}
                    <div className={styles.synopsis_container}>
                        <p>
                            { seeMore ? synopsis.slice(0, 390) : synopsis }

                            {
                                (synopsis.length > 390 ) ? (seeMore)
                                    ? <span onClick={()=> setSeeMore(false)}>See more...</span> 
                                    : <span  onClick={()=> setSeeMore(true)}>See less...</span>

                                : ""
                            }
                        </p>

                        
                    </div>
                    
                    <AddRemoveButtons anime={anime} />
                </div>
            </div>
        </div>
    )
}