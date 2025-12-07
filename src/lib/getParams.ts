import { AnimeParams } from "./api";

export function getParams({ params }: { params: URLSearchParams }): AnimeParams {
    const page = Number(params.get("page") ?? 1);
    const limit = Number(params.get("limit") ?? 25);

    const typeParam = params.get("type");
    const type: "tv" | "movie" =  typeParam === "movie" ? typeParam : "tv";

    const min_score = params.get("min_score") ? Number(params.get("min_score")) : undefined;

    const genresParam = params.get("genres");
    const genres: number[] | undefined = genresParam ? genresParam.split(",").map(Number) : undefined;

    const search = params.get("q") ?? undefined;

    return {
        page,
        limit,
        type,
        min_score,
        genres,
        search,
    };
}
