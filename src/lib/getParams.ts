import { AnimeParams } from "./api";

export function getParams({ params }: { params: URLSearchParams }): AnimeParams {
    const page = Number(params.get("page") ?? 1);
    const limit = Number(params.get("limit") ?? 20);

    const typeParam = params.get("type");
    const type: "tv" | "movie" | "ova" = 
        typeParam === "movie" || typeParam === "ova" ? typeParam : "tv";

    const statusParam = params.get("status");
    const status: "airing" | "complete" | "upcoming" | undefined =
        statusParam === "airing" || statusParam === "complete" || statusParam === "upcoming"
        ? statusParam
        : undefined;

    const min_score = params.get("min_score") ? Number(params.get("min_score")) : undefined;

    const genresParam = params.get("genres");
    const genres: number[] | undefined = genresParam ? genresParam.split(",").map(Number) : undefined;

    const search = params.get("q") ?? undefined;

    return {
        page,
        limit,
        type,
        status,
        min_score,
        genres,
        search,
    };
}
