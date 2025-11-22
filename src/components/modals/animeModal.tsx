"use client"

import { ModalContext, ModalContextType } from "../providers/modalProvider"
import AddRemoveButtons from "../buttons/actionButtons/addRemoveButtons";
import { AnimeData } from "@/lib/api"
import { useContext } from "react"
import "./animeModal.css"
import Image from "next/image";

export default function Modal({anime} : {anime: AnimeData}){
    const ctx = useContext<ModalContextType | null>(ModalContext);

    if(!ctx) throw Error("Erro no provedor");

    const synopsis = anime.synopsis;
    const { setModal } = ctx;
    
    return (
        <div className="blur">
            <div className="modal">
                <button className="close" onClick={()=>{setModal(null)} }/>

                <div className="image_container">
                    <Image 
                        className="anime_img" 
                        src={`${anime.large_image}`} 
                        alt="anime_modal_photo"
                        width={300}
                        height={450} />
                </div>

                <div className="anime_description">
                    <div className="title_container">
                        <p>{anime.title} <span>★ {anime.score}</span></p>
                    </div>
                    
                    <div className="genres_container">
                        {
                            anime.genres.map((e,index)=>(
                                <p className="genre" key={index}>{e}</p>
                            ))
                        }
                    </div>

                    <div className="synopsis_container">
                        <p>{
                            synopsis.toLowerCase().includes("written by mal rewrite")
                                ? synopsis.slice(0,-26)
                                : synopsis
                        }</p>
                    </div>

                    <AddRemoveButtons anime={anime} />
                </div>
            </div>
        </div>
    )
}