import AddRemoveButtons from "../buttons/addRemoveButtons";
import { homeBanner, movieBanner } from "@/lib/dataAnimes";
import MobileBanner from "./mobileBanner/mobileBanner";
import ViewButton from "../buttons/viewMoreButton";
import styles from "./banner.module.css";
import { AnimeData } from "@/lib/api";

export default  function BannerComponent({route} : {route : "home" | "movies"}){
    const data : AnimeData[] = (route === 'home') ? homeBanner : movieBanner;   

    return (
        <div className={styles.banner}>
            <div className={styles.desktop_banner}>  {/* CAROUSEL */}
                <div 
                    className={(route === 'home') ? styles.homeBanner : styles.movieBanner} 
                    style={{ backgroundImage: `url("${data[0].banner_desktop_image}")`}}>

                    <div className={styles.banner_description}>
                        <div className={styles.title_container}>
                            <h1>{data[0].title}</h1>
                            <p style={{color: (route === "home" ? "black" : "gold")}} >⭐ {data[0].score}</p>
                        </div>

                        <h5 className={styles.top_rated}>Top Rated</h5>
                        <p className={styles.banner_synopsis} >
                            {data[0].synopsis.slice(0,295)}...
                        </p>

                        <div className={styles.banner_buttons}>
                            <ViewButton anime={data[0]} />
                            <AddRemoveButtons anime={data[0]} />
                        </div>
                    </div>
                </div>
            </div>

            <MobileBanner data={data} />
        </div>
    )
}