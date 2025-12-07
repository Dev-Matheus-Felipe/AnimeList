"use client"

import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import AnimeSection from "../animes/animesSection/animeSection";
import { useInView } from "react-intersection-observer";
import styles from "./controlerLoading.module.css";
import { genresData } from "@/lib/dataAnimes";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadedAnime {
    title: string;
    animes: AnimeData[];
}

export default function ControlerLoading({ type, startIndex }: { type: "tv" | "movie", startIndex: number }) {
    const [loadedAnimes, setLoadedAnimes] = useState<LoadedAnime[]>([]);
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && currentIndex < genresData.length) {
            const genre = genresData[currentIndex];

            const animeParams: AnimeParams = {
                type,
                page: 1,
                limit: 10,
                genres: [genre.id],
            };

            fetchAnimes({ animeParams }).then((res: AnimeData[]) => {
                setLoadedAnimes(prev => [...prev, { title: genre.label, animes: res ?? [] }]);
                setCurrentIndex(prev => prev + 1);
            });
        }
    }, [inView, currentIndex, type]);

    return (
        <>
           {
                loadedAnimes.map((section: LoadedAnime, i: number) => {
                    const genre = genresData[startIndex + i];
                    if (!genre) return null;

                    return (
                        <AnimeSection
                            key={i}
                            info={{
                                title: section.title,
                                animes: section.animes ?? [],
                                type,
                                genre: genre.id
                            }}
                        />
                    )
                })
           }

            {currentIndex < genresData.length && (
                <div className={styles.loadMore} ref={ref}>
                    <Image src="/icons/general/loadingMore.svg" alt="Loading" width={40} height={40} />
                </div>
            )}
        </>
    );
}
