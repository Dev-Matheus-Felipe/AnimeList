"use client";

import { AnimeData, AnimeParams, fetchAnimes } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BackNextButtonProps {
    searchData: AnimeData[];
    params: AnimeParams;
}

export default function BackNextButton({ searchData, params }: BackNextButtonProps) {

    const router = useRouter();
    const [nextSection, setNextSection] = useState<AnimeData[]>([]);

    const buttonHandler = (number: number): void => {
        const newParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                newParams.set(key, String(value));
            }
        });

        // 👇 Atualiza corretamente a página da URL
        newParams.set("page", String(params.page + number));

        router.replace(`/search/id?${newParams.toString()}`);
    };

    useEffect(() => {
        const fetchAnimesData = async () => {
            const fetched = await fetchAnimes({
                animeParams: { ...params, page: params.page + 1}});

            setNextSection(fetched || []);
        };

        fetchAnimesData();
    }, []);

    return (
        <div className="searchButtons" style={{ visibility:searchData.length < 25 ?  "hidden" : "visible"}}>
            <button
                className="button back"
                style={{ visibility: params.page > 1 ? "visible" : "hidden" }}
                onClick={() => buttonHandler(-1)}
            >
                Back
            </button>

            <button
                className="button next"
                style={{
                    visibility:
                        nextSection.length > 0 && searchData.length === 25
                            ? "visible"
                            : "hidden"
                }}
                onClick={() => buttonHandler(1)}
            >
                Next
            </button>
        </div>
    );
}
