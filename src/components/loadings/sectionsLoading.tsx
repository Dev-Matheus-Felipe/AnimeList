import style from "./sectionsLoading.module.css"

export default function SectionsLoading(){
    return (
        <>
            {
                [0,1,2,3,4,5].map((e: number) => (
                    <div key={e} className={style.sectionLoading}>
                        <div className={style.title_container}>
                            <div className={style.title} />
                        </div>

                        <div className={style.animes}>
                            {
                                [0,1,2,3,4,5,6,7,8,9].map((n: number) => (
                                    <div key={n} className={style.anime} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}