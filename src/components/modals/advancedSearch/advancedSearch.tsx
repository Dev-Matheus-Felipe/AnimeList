"use client";

import { SetStateAction, useEffect, useState } from "react";
import { GenresData, genresData } from "@/lib/dataAnimes";
import styles from "./advancedSearch.module.css";
import { useRouter } from "next/navigation";
import { AnimeParams } from "@/lib/api";

type State = {
    titleSearch: string,
    minScore: string | number,
    type: "tv" | "movie",
    genres: GenresData[],
    searchInput: string,
    scoreModal: boolean
}

export default function AdvancedSearch({ 
    config, 
    setConfig, 
    params  
    } : { 
        config: boolean, 
        setConfig: React.Dispatch<SetStateAction<boolean>>
        params : AnimeParams
    }) {

    const router = useRouter();

    const [data, setData ] = useState<GenresData[]>(genresData);
    const [state, setState] = useState<State>({
        titleSearch: "",
        minScore: "Min score",
        type: "tv",
        genres: [],
        searchInput: "",
        scoreModal: false
    });

    const selectGenre = (e: GenresData) : void => {

        // Filter out unselected genres

        const dataFiltered: GenresData[] = data.filter((g: GenresData) => g.genre != e.genre);
        setData(dataFiltered);

        // Save the genre selected

        setState((prev : State) => (
            {...prev, genres: [...state.genres, e], searchInput: "" }
        ))
    }
    
    const removeGenre = (e : GenresData) : void => {

        // filter the genres selected

        const updatedChosen : GenresData[]  = state.genres.filter(g => g != e);
        setState((prev : State) => (
            {...prev, genres: updatedChosen  }
        ))

        // att the new list of genres unselected

        const newData : GenresData[] = genresData.filter(g => !updatedChosen.some(c => c == g));
        setData(newData);
    }


    const filteredGenres: GenresData[] = data.filter((g: GenresData) =>
        g.genre.toLowerCase().includes(state.searchInput.toLowerCase())
    );

    // seachers for the anime with all the configurations setted up

    const searchAnimes = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        const genres : number[] = state.genres.map((g : GenresData) => (g.id));

        let baseUrl = `/search/id?page=1&limit=25&type=${state.type}&order_by=score&sort=desc`;
        
        if (state.genres?.length)
            baseUrl += `&genres=${genres.join(",")}`;

        if(state.titleSearch.length > 0)
            baseUrl += `&q=${state.titleSearch}`;

        if(state.minScore !== "Min score" )
            baseUrl += `&min_score=${state.minScore}`;

        setConfig(false);
        router.push(baseUrl);
    };


    // att all states to get the values nedded

    useEffect(()=>{
        let newGenresSelected : GenresData[] = [];

        if(params.genres && params.genres.length > 0) 
            newGenresSelected  = genresData.filter((e: GenresData) => params.genres!.some(g => e.id == g ));;            

        setState((prev: State) => ({
            ...prev,
            type: params.type,
            titleSearch: (params.search) ? params.search : "",
            genres: newGenresSelected,
            minScore: params.min_score ? params.min_score : "Min score"
        }));

        const newGenresList = genresData.filter((e) => !newGenresSelected.some((g : GenresData) => g === e));
        setData(newGenresList);
    },[params])


    return (
        <div className={styles.blur} style={{ display: config ? "flex" : "none" }} >
            <div className={styles.container_filter} >
                <button className={styles.close} onClick={()=>{setConfig(false)} }/>

                <form className={styles.form_filter} onSubmit={searchAnimes}>
                    <h1>Filter</h1>

                    <input
                        className={styles.title_input}
                        type="text"
                        placeholder="Search for some anime"
                        autoComplete="off"
                        value={state.titleSearch}
                        onChange={(e) =>
                            setState(prev => ({ ...prev, titleSearch: e.target.value }))}
                    />

                    <div className={styles.type_score_container}>

                        <div className={styles.types}>
                            <button
                                type="button"
                                className={state.type === "tv" ? styles.typeSelected : ""}
                                onClick={() => setState(prev => ({ ...prev, type: "tv" }))}
                            >
                                TV
                            </button>

                            <button
                                type="button"
                                className={state.type === "movie" ? styles.typeSelected : ""}
                                onClick={() => setState(prev => ({ ...prev, type: "movie" }))}
                            >
                                Movies
                            </button>
                        </div>

                        <div className={styles.minimun_score} style={{ height: state.scoreModal ? "150px" : "29px" }}>
                            <div
                                className={styles.score_title}
                                onClick={() => setState(prev => ({ ...prev, scoreModal: !prev.scoreModal }))}>

                                <p 
                                    style={{ paddingRight: (state.minScore === "Min score") ? "15px" : "0"}}>
                                        {state.minScore}
                                </p>
                                <span>{state.scoreModal ? "∧" : "∨"}</span>
                            </div>

                            <ul>
                                <li
                                    onClick={() =>
                                        setState(prev => ({
                                            ...prev,
                                            minScore: "Min score",
                                            scoreModal: false
                                        }))}>

                                    Undefined
                                </li>

                                {[9,8,7,6,5].map((e: number) => (
                                    <li
                                        key={e}
                                        onClick={() =>
                                            setState((prev : any) => ({
                                                ...prev, minScore: e, scoreModal: false }))}
                                                
                                    >{e}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.genres_filter}>
                        <label>Search genres</label>

                        <input
                            type="text"
                            id="genres_input"
                            value={state.searchInput}
                            onChange={(e) => setState(prev => ({ ...prev, searchInput: e.target.value })) }
                            placeholder="Search for one or more desired genres" />

                        <ul style={{
                            border: state.searchInput && filteredGenres.length
                                ? "1px solid #797979" : "0" }}>

                            {state.searchInput &&
                                filteredGenres.map(e => 
                                    <li key={e.id} onClick={()=>selectGenre(e)} >{e.genre}</li> )}
                        </ul>

                        
                    </div>
                    
                    <div className={styles.genres_chosen}>
                        {
                            state.genres.map((e : any)=>
                                <p key={e.id} onClick={()=>removeGenre(e)} >{e.genre}</p>)
                        }
                    </div>

                    <button type="submit" className={styles.button_filter}>Search</button>
                </form>
            </div>
        </div>
    );
}
