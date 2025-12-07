import ControlerLoading from '@/components/lazyComponent/controlerLoading';
import AnimeSection from '@/components/animes/animesSection/animeSection';
import { AnimeData, AnimeParams, fetchAnimes } from '@/lib/api';
import { GenresData, genresData } from '@/lib/dataAnimes';
import style from "./animesContainer.module.css";

export default async function AnimesContainer({type} : {type: "tv" | "movie"}){

    // gets the initial data for the page

    const genre: GenresData = genresData[0];

    const animeParams: AnimeParams = {
        type: type,
        page: 1,
        limit: 10,
        genres: [genre.id]
    };
    
    // saves the initial data

    const animes: AnimeData[] = await fetchAnimes({animeParams});

    return (
        <div className={style.animes}>
            <AnimeSection info={{ title: genre.label, animes: animes, type: type, genre: genre.id }} /> 

            <ControlerLoading type={type} startIndex={1} />
        </div>
    )
}