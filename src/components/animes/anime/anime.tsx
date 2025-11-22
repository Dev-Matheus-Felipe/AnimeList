"use client"

import { ModalContext, ModalContextType } from '@/components/providers/modalProvider';
import { AnimeData } from '@/lib/api';
import { useContext } from 'react';
import "./anime.css"

export function Anime({anime}: {anime: AnimeData}){
    const ctx= useContext< ModalContextType | null>(ModalContext);

    if (!ctx) throw new Error("useModal deve ser usado dentro de <ModalProvider>");
    const { setModal } = ctx;
    
    return(
        <>
            <div 
                className="anime_single" 
                onClick={()=> setModal(anime)}
                style={{
                    backgroundImage: `url('${anime.image}')`, 
                    "--title": `"${anime.title.slice(0,36)}"`
                } as React.CSSProperties}
            ></div>
        </>
    )
}