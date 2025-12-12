"use client";

import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./actionButtons.css"

interface BackNextButtonsProps {
    searchData: AnimeData[];
    params: AnimeParams;
}

export default function BackNextButton({searchData, params}: BackNextButtonsProps) {
    const [nextSection, setNextSection] = useState<AnimeData[]>([]);
    const router = useRouter();

    const buttonHandler = (number: number): void => {
        const newParams = new URLSearchParams();

        // gets the right params

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                newParams.set(key, String(value));
            }
        });

        newParams.set("page", String(params.page + number));

        // requests new animes

        router.replace(`/search/id?${newParams.toString()}`);
    };

    // verifys if there are more anime, otherwise blocks the next button
    
    useEffect(() => {
        const fetchAnimesData = async () => {
            const fetched = await fetchAnimes({
                animeParams: { ...params, page: params.page + 1, limit: 1}});

            setNextSection(fetched || []);
        };

        fetchAnimesData();
    }, []);

    return (
        <div className="searchButtons" style={{ visibility: (searchData.length < 25) ?  "hidden" : "visible"}}>
            <button
                className="button back"
                style={{ visibility: params.page > 1 ? "visible" : "hidden" }}
                onClick={() => buttonHandler(-1)}>
                Back 
            </button>

            <button
                className="button next"
                aria-label="trocar de pagina"
                onClick={() => buttonHandler(1)}
                style={{
                    visibility:
                        (nextSection.length > 0 && searchData.length === 25) ? "visible" : "hidden" }}>
                Next
            </button>
        </div>
    );
}
