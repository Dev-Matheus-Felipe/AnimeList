"use client"

import { animeContexProvider, animesContext } from "@/components/providers/animeListProvider";
import { Anime } from "@/components/animes/anime/anime";
import styles from "./my-list.module.css";
import { AnimeData } from "@/lib/api";
import { useContext } from "react";

export default function MyList(){
    const ctx = useContext<animeContexProvider | null>(animesContext);
    if(!ctx) throw Error("ERROR");

    const { myList } = ctx;  // gets animes from AnimesModal (localstorage)

    return(
        <div className={styles.myList_container}>
            <h1>My List</h1>

            <div className={styles.myList}>
                {
                    (myList && myList.length > 0) 
                        ? myList.map((e: AnimeData, index: number) =>(
                            <Anime key={index} info={{anime: e, width: "140px", height: "190px"}} /> ))

                        : <p>No anime added yet.</p>
                }
            </div>
        </div>
    )
}