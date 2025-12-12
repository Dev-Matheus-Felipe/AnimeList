"use client"

import { ModalContext, ModalContextType } from "@/components/providers/modalProvider";
import { AnimeData } from "@/lib/api";
import { useContext } from "react";
import "./actionButtons.css"

export default function ViewButton({anime} : {anime: AnimeData}){
    const ctx= useContext< ModalContextType | null>(ModalContext);

    if (!ctx) throw new Error("ERROR");
    const { setModal } = ctx;
    
    return (
        <button className="viewMore" aria-label="ver descricao" onClick={() => setModal(anime)}>
            View More
        </button>
    )
}