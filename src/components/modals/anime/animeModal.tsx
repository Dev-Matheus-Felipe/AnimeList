"use client"

import { ModalContext, ModalContextType } from "../../providers/modalProvider"
import AddRemoveButtons from "../../buttons/addRemoveButtons";
import styles from "./animeModal.module.css";
import { AnimeData } from "@/lib/api"
import { useContext } from "react"
import Image from "next/image";

export default function Modal({anime} : {anime: AnimeData}){
    const ctx = useContext<ModalContextType | null>(ModalContext);

    if(!ctx) throw Error("ERROR");

    const synopsis = anime.synopsis;
    const { setModal } = ctx;
    

    const closeMedal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement && e.target.id === "blur")
            setModal(null);
    };

    return (
        <div id="blur" onClick={closeMedal} className={styles.blur}>
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

                <div className={styles.description}>
                    <div className={styles.title_container}>
                        <p>{anime.title} <span>★ {anime.score}</span></p>
                    </div>
                    
                    <div className={styles.genres_container}>
                        {
                            anime && anime.genres.map((e: string, index: number)=>(
                                <p className={styles.genre} key={index}>{e}</p> ))
                        }
                    </div>

                    <div className={styles.synopsis_container}>
                        <p>
                            {
                                synopsis && synopsis.toLowerCase().includes("written by mal rewrite")
                                    ? synopsis.slice(0,-26)
                                    : synopsis
                            }
                        </p>
                    </div>

                    <AddRemoveButtons anime={anime} />
                </div>
            </div>
        </div>
    )
}