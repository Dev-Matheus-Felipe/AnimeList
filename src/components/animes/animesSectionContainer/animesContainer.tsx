import ControlerLoading from '@/components/lazyComponent/controlerLoading';
import AnimeSection from '@/components/animes/animesSection/animeSection';
import { AnimeData, AnimeParams, fetchAnimes } from '@/lib/api';
import { GenresData, genresData } from '@/lib/dataAnimes';
import style from "./animesContainer.module.css";

export default async function AnimesContainer({type} : {type: "tv" | "movie"}){

    // gets the initial data for the page

    const genres: GenresData[] = genresData.slice(0,2);

    const animePromises: Promise<AnimeData[]>[] = genres.map( async (genre: GenresData) => {
        const animeParams: AnimeParams = {
            type: type,
            page: 1,
            limit: 10,
            genres: [genre.id]
        };
        
        return await fetchAnimes({ animeParams });
    });

    // saves the initial data

    const animes: AnimeData[][] = await Promise.all(animePromises);

    return (
        <div className={style.animes}>

            {
               animes && animes.map((e: AnimeData[], index: number) => (
                    <AnimeSection 
                        key={index} 
                        info={{ title: genres[index].label, animes: e, type: type, genre: genres[index].id }} /> 
                ))
            }

            <ControlerLoading type={type} startIndex={2} />
        </div>
    )
}