export interface Ageneros{
    name: string,
    index: number
}


export function ListaGeneros(): Ageneros[]{
    const generos: Ageneros[] = [
        { name: "Ação", index: 1 }, 
        { name: "Aventura", index: 2 },
        { name: "Carros", index: 3 }, 
        { name: "Comédia", index: 4 },
        { name: "Dementia", index: 5 }, 
        { name: "Demônios", index: 6 },
        { name: "Mistérios", index: 7 }, 
        { name: "Drama", index: 8 },
        { name: "Ecchi", index: 9 },
        { name: "Fantasia", index: 10 },
        { name: "Jogos", index: 11 }, 
        { name: "Histórico", index: 13 },
        { name: "Terror", index: 14 },
        { name: "Artes Maciais", index: 17 },
        { name: "Mecha", index: 18 },
        { name: "Música", index: 19 },
        { name: "Paródia", index: 20 },
        { name: "Samurais", index: 21 },
        { name: "Romances", index: 22 }, 
        { name: "Escolas", index: 23 },
        { name: "Ficção cientifica", index: 24 }, 
        { name: "Shoujo", index: 25 },
        { name: "Shounen", index: 27 }, 
        { name: "Espaço", index: 29 },
        { name: "Esportes", index: 30 },
        { name: "Super Poderes", index: 31 },
        { name: "Vampiros", index: 32 },
        { name: "Yaoi", index: 33 },
        { name: "Yuri", index: 34 }, 
        { name: "Harem", index: 35 },
        { name: "Slice of Life", index: 37 }, 
        { name: "Militar", index: 38 },
        { name: "Policial", index: 39 }, 
        { name: "Psicológico", index: 40 },
        { name: "Seinen", index: 42 }
    ];

    return generos;
}