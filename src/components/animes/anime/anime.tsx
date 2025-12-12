"use client"

import { ModalContext, ModalContextType } from '@/components/providers/modalProvider';
import { motion } from 'framer-motion';
import { AnimeData } from '@/lib/api';
import { useContext } from 'react';
import "./anime.css"
import Image from 'next/image';

export type AnimeSingleInfo = {
    anime: AnimeData,
    width: string,
    height: string
}

export function Anime({info}: {info: AnimeSingleInfo}){
    const ctx= useContext< ModalContextType | null>(ModalContext);

    if (!ctx) throw new Error("Error to get Modal infos");
    const { setModal } = ctx;

    // cards animations

    const variantes = {
        hidden: {opacity : 0},
        visible: {opacity: 1}
    }

    // anime style

    const style = {
        "--title": `"${info.anime.title.slice(0,36)}"`,
        minWidth: info.width,
        height: info.height

    } as React.CSSProperties;

    return(
        <motion.div 
            variants={variantes}
            initial="hidden"
            animate="visible"
            viewport={{amount: 0}}
            transition={{ delay: 0.5, ease: "easeInOut", duration: 0.5 }}
            className="anime" 
            onClick={()=> setModal(info.anime)}
            style={style}>
                <Image src={`${info.anime.image}`} alt='anime image' width={100} height={200} className="anime_image"  />

        </motion.div >

    )
}