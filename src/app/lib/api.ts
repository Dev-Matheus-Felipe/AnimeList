'use server'

import { Ianime, generos } from "../components/anime_single/anime"; 

interface Criterios {
    page: number;
    genero?: number[];
    movie?: boolean;
    search?: string;
}

interface APIResponse {
    data: {
        title: string;
        score: number;
        images: {
            jpg: {
                image_url: string;
            };
        };
        synopsis: string;
        genres: { name: string }[];  // A resposta da API traz 'genres' como um array de objetos com 'name' como string
    }[];
}

export async function fetchAnimes(criterios: Criterios): Promise<Ianime[]> {

    const animes: Ianime[] = [];
    let baseUrl: string;

    baseUrl = (criterios.movie === true)
        ? `https://api.jikan.moe/v4/anime?limit=20&page=${criterios.page}&order_by=score&sort=desc&type=movie`
        : `https://api.jikan.moe/v4/anime?limit=20&page=${criterios.page}&order_by=score&sort=desc`;

    baseUrl += (criterios.genero) ? `&genres=${criterios.genero}` : `&q=${criterios.search}`;

    // Requisição para a API
    const response: Response = await fetch(baseUrl, {
        cache: 'force-cache',
        next: {
            revalidate: 3600
        }
    });

    // Tipagem explícita da resposta
    const data: APIResponse = await response.json();

    if (data && data.data) {
        data.data.map((e) => {
            const generos_list: generos[] = [];

            // Agora estamos empurrando um objeto generos em vez de uma string simples
            e.genres.map((i: { name: string }) => {
                generos_list.push({ name: i.name });  // Empurrando o objeto no formato correto { name: string }
            });

            animes.push({
                title: e.title,
                score: e.score,
                image: e.images.jpg.image_url,
                synopsis: e.synopsis,
                genres: generos_list
            });
        });
    }

    return animes;
}
