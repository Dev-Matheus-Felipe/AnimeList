import AddRemoveButtons from "../buttons/actionButtons/addRemoveButtons";
import ViewButton from "../buttons/actionButtons/viewMoreButton";
import { homeBanner, movieBanner } from "@/lib/dataAnimesBanner";
import { AnimeData } from "@/lib/api";
import "./banner.css"

export default async function BannerComponent({route} : {route : "home" | "movies"}){
    const data : AnimeData = (route === 'home') ? homeBanner : movieBanner;

    return (
        (data) && 
        <div className={(route === 'home') ? "homeBanner" : "movieBanner"} style={{backgroundImage: `url("${data.image}")`}}>
            <div className="banner_description">
                <div className="banner_title">
                    <h1>{data.title}</h1>
                    <p>⭐ {data.score}</p>
                </div>

                <h5>Top Rated</h5>

                <p className='banner_synopsis'>{data.synopsis.slice(0,295)}...</p>

                <div className="banner_buttons">
                    <ViewButton anime={data} />
                    <AddRemoveButtons anime={data} />
                </div>
            </div>
        </div>
    )
}