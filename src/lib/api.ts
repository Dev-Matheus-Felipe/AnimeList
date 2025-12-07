"use cache"

export type AnimeParams = {
    page: number;
    type: "tv" | "movie";
    limit: number;
    search?: string;
    genres?: number[];
    min_score?: number;
}

export type AnimeData = {
    title: string,
    score: number,
    image: string,
    large_image: string,
    synopsis: string,
    genres: string[],
    banner_desktop_image? : string,
    banner_mobile_image? : string
}

export type ApiAnime = {
    title: string;
    score: number;
    synopsis: string;
    genres: { name: string }[];
    images: {
        jpg: { image_url: string; large_image_url: string };
    };
};

export async function fetchAnimes({animeParams}: {animeParams : AnimeParams}): Promise<AnimeData[]> {

    const animes : AnimeData[] = [];
    let baseUrl : string;

    baseUrl = `https://api.jikan.moe/v4/anime?limit=${animeParams.limit}&page=${animeParams.page}&type=${animeParams.type}&order_by=score&sort=desc`;
        

    if (animeParams.genres?.length)
        baseUrl += `&genres=${animeParams.genres.join(",")}`;

    if(animeParams.search)
        baseUrl += `&q=${animeParams.search}`;

    if(animeParams.min_score)
        baseUrl += `&min_score=${animeParams.min_score}`;

    
    const response: Response = await fetch(baseUrl, { cache: 'force-cache', });
    const data = await response.json().then(res => res.data).catch(() => []);

    if(data)
        data.map((e: ApiAnime) => {
            const generos_list : string[] = [];

            e.genres.map((i: { name: string }) => {
                generos_list.push(i.name);
            });

            animes.push({
                title: e.title,
                score: e.score,
                image: e.images.jpg.image_url,
                large_image: e.images.jpg.large_image_url,
                synopsis: e.synopsis,
                genres: generos_list
            });
        });

    return animes;
}