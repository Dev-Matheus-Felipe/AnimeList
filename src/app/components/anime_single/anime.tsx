'use client'

import { usePathname, useRouter } from 'next/navigation'
import styles from'./anime.module.css'

export interface generos{
    name: string
}

export interface Ianime{
    title: string,
    score: number,
    image: string,
    synopsis: string,
    genres: generos[]
}

export function Anime( {anime}: {anime: Ianime[]}){

    // ----------- || ----------- //

    const router = useRouter();
    const path = usePathname();
    
    // ----------- || ----------- //

    const mostrarAnime = (e: Ianime) : void => {
        const title = encodeURIComponent(e.title);
        const generos : string[] = [];
        e.genres.map((e)=>generos.push(e.name))

        const query = new URLSearchParams({
            title: e.title,
            score: e.score.toString(),
            image: e.image,
            synopsis: e.synopsis,
            genres: generos.join(','),
            path: path,
        }).toString(); 

        
        router.push(`/anime/${title}?${query}`);
        
    }

    return(
        <>
            {
                (anime) 
                ? anime.map((e,index)=>(
                    <div key={`${e.title}-${index}`} className={styles.anime_single} onClick={()=>mostrarAnime(e)} >
                        <img src={e.image} alt={e.title} />
                        <h3>{(e.title.length > 19 ? e.title.slice(0,19) +'...' : e.title)}</h3>
                        <div className={styles.nota_anime_single}>
                            <p>⭐ {e.score}</p>
                        </div>
                    </div>
                ))

                : null
    
            }
        </>
    )
}