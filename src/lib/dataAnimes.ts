import { AnimeData } from "./api";

export const homeBanner: AnimeData[] = [
  {
    title: "Sousou no Frieren",
    genres: ["Adventure","Drama","Fantasy"],
    synopsis: "Beyond Journey's End is about an elven mage named Frieren who, after her party of heroes defeats the Demon King, struggles to understand the human concept of time and mortality. She realizes she has a limited time to connect with her aging comrades and embarks on a new journey with an apprentice, Fern, and a warrior, Stark. As they travel the land they once saved, Frieren reflects on her past adventures, confronts her regrets, and seeks to understand the bonds she shared with her former party. ",
    score: 9.29,
    large_image: "/banners/home/mobile/modals/frierenModal.webp",
    banner_desktop_image: "/banners/home/homebanner.webp",
    banner_mobile_image: "/banners/home/mobile/frieren.jpg",
    image: "/banners/home/mobile/modals/frierenModal.webp"
  },

  {
    title: "Sword Art Online",
    genres: ["Action","Adventure","Fantasy","Romance"],
    synopsis: `Ever since the release of the innovative NerveGear, gamers from all around the globe have been given the opportunity to experience a completely immersive virtual reality. Sword Art Online (SAO), one of the most recent games on the console, offers a gateway into the wondrous world of Aincrad, a vivid, medieval landscape where users can do anything within the limits of imagination. With the release of this worldwide sensation, gaming has never felt more lifelike. However, the idyllic fantasy rapidly becomes a brutal nightmare when SAO's creator traps thousands of players inside the game. The "log-out" function has been removed, with the only method of escape involving beating all of Aincrad's one hundred increasingly difficult levels. Adding to the struggle, any in-game death becomes permanent, ending the player's life in the real world. While Kazuto "Kirito" Kirigaya was fortunate enough to be a beta-tester for the game, he quickly finds that despite his advantages, he cannot overcome SAO's challenges alone. Teaming up with Asuna Yuuki and other talented players, Kirito makes an effort to face the seemingly insurmountable trials head-on. But with difficult bosses and threatening dark cults impeding his progress, Kirito finds that such tasks are much easier said than done.`,
    score: 8.64,
    large_image: "/banners/home/mobile/modals/kiritoAsunaModal.webp",
    banner_mobile_image: "/banners/home/mobile/kiritoAsuna.jpg",
    image: "/banners/home/mobile/modals/kiritoAsunaModal.webp"

  },

  {
    title: "Kusuriya no Hitorigoto",
    genres: ["Drama","Mystery"],
    synopsis: "Using her wit and vast knowledge of medicines and poisons alike, Maomao played a pivotal role in solving a series of mysteries and conspiracies that plagued the imperial court. Having recently come to terms with the secrets of her parents, she returns to fulfill her normal duties on behalf of the emperor's highest-ranking consorts. Maomao also works alongside the eunuch Jinshi to better the consorts' many ladies-in-waiting, including helping them learn to read. However, with the arrival of a merchant caravan comes a new wave of intrigue. A pattern of strange coincidences involving the visitors and their wares unsettles Maomao, driving her to investigate the puzzling circumstances behind the convoy. As dangers from both outside and within threaten the balance between the imperial concubines, Maomao continues to utilize her cunning and medical expertise to keep the women safe from harm.",
    score: 9.29,
    large_image: "/banners/home/mobile/modals/maomaoModal.webp",
    banner_mobile_image: "/banners/home/mobile/maomao.jpg",
    image: "/banners/home/mobile/modals/maomaoModal.webp" 

  }
]

export const movieBanner: AnimeData[] = [
  {
    title: "Chainsaw Man Movie: Reze-hen",
    genres: ["Action", "Fantasy"],
    synopsis: "Denji, a poor young man who, after being killed, makes a deal with his pet devil, Pochita, to be reborn as a human-devil hybrid. He gains the ability to transform his body parts into chainsaws and is recruited by the Public Safety Devil Hunters to hunt devils that plague their world. The story tracks his life as he navigates this new world, trying to find a good life and fulfilling his dreams while fighting devils alongside his eccentric new teammates, Aki and Power. ",
    score: 9.19,
    large_image: "/banners/movies/mobile/modals/denji.webp",
    banner_desktop_image: "/banners/movies/moviesBanner.webp",
    banner_mobile_image: "/banners/movies/mobile/denji.jpg",
    image: "/banners/movies/mobile/modals/denji.webp",
  },

  {
    title: "Kimi no Na wa",
    genres: ["Award Winning","Drama"],
    synopsis: "Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the bustling city of Tokyo—a dream that stands in stark contrast to her present life in the countryside. Meanwhile in the city, Taki Tachibana lives a busy life as a high school student while juggling his part-time job and hopes for a future in architecture. One day, Mitsuha awakens in a room that is not her own and suddenly finds herself living the dream life in Tokyo—but in Taki's body! Elsewhere, Taki finds himself living Mitsuha's life in the humble countryside. In pursuit of an answer to this strange phenomenon, they begin to search for one another. Kimi no Na wa. revolves around Mitsuha and Taki's actions, which begin to have a dramatic impact on each other's lives, weaving them into a fabric held together by fate and circumstance.",
    score: 8.83,
    large_image: "/banners/movies/mobile/modals/yourname.webp",
    banner_mobile_image: "/banners/movies/mobile/yourname.jpg",
    image: "/banners/movies/mobile/modals/yourname.webp",

  },

  {
    title: "Kimetsu no Yaiba Movie 3: Mugenjou-hen",
    genres: ["Action","Supernatural"],
    synopsis: "Third anime movie of the trilogy adaptation of the Infinity Castle Arc.",
    score: 8.0,
    large_image: "/banners/movies/mobile/modals/kimetsu.webp",
    banner_mobile_image: "/banners/movies/mobile/kimetsu.jpg",
    image: "/banners/movies/mobile/modals/kimetsu.webp",

  }
]


export type GenresData = {
  genre: string, 
  label: string,
  id: number
}
export const genresData : GenresData[] = [

  { genre: "Action", label: "Action for Everyone", id: 1 },
  { genre: "Adventure", label: "Epic Journeys", id: 2 },
  { genre: "Romance", label: "Heartfelt Romance", id: 22 },
  { genre: "Comedy", label: "Guaranteed Laughs", id: 4 },
  { genre: "Shounen", label: "Big Hype Stories", id: 27 },
  { genre: "Isekai", label: "New Worlds Await", id: 62 },
  { genre: "Fantasy", label: "Magic & Destiny", id: 10 },
  { genre: "Sci-Fi", label: "Futures Reimagined", id: 24 },

  
  { genre: "Mystery", label: "Twists & Clues", id: 7 },
  { genre: "Drama", label: "Stories That Hit", id: 8 },


  { genre: "School", label: "School Moments", id: 23 },
  { genre: "Sports", label: "Chasing Victory", id: 30 },
  { genre: "Supernatural", label: "Beyond Reality", id: 37 },
  { genre: "Psychological", label: "Mind Games", id: 40 },
  { genre: "Slice of Life", label: "Everyday Warmth", id: 36 },
  { genre: "Horror", label: "Pure Fear", id: 14 },
  { genre: "Seinen", label: "Mature Stories", id: 42 },
  { genre: "Music", label: "Stories in Rhythm", id: 19 },
  { genre: "Historical", label: "Timeless Tales", id: 13 },

 
  { genre: "Harem", label: "Many Hearts, One Hero", id: 35 },
  { genre: "Super Power", label: "Power Unleashed", id: 31 },
  { genre: "Samurai", label: "Honor & Steel", id: 21 },
  { genre: "Military", label: "Tactical Battles", id: 38 },
  { genre: "Mecha", label: "Giants of Steel", id: 18 },
  { genre: "Idols (Female)", label: "Shining Dreams", id: 60 },
  { genre: "Vampire", label: "Night Allure", id: 32 },
  { genre: "Josei", label: "Adult Romance", id: 43 },

  
  { genre: "Reincarnation", label: "A New Life", id: 72 },
  { genre: "Urban Fantasy", label: "Magic in the City", id: 82 },
  { genre: "Villainess", label: "Fate Rewritten", id: 83 },
  { genre: "Love Polygon", label: "Complex Romance", id: 64 },
  { genre: "Love Status Quo", label: "Stable Feelings", id: 74 },
  { genre: "Survival", label: "Only the Strong", id: 76 },

 
  { genre: "Suspense", label: "Tense Moments", id: 41 },
  { genre: "Detective", label: "Smart Cases", id: 39 },
  { genre: "Gore", label: "Extreme Violence", id: 58 },
  { genre: "Racing", label: "Speed Rush", id: 3 },
  { genre: "Strategy Game", label: "Brains First", id: 11 },
  { genre: "Time Travel", label: "Rewrite Time", id: 78 },
  { genre: "Organized Crime", label: "Underworld Moves", id: 68 },
  { genre: "Martial Arts", label: "Striking Skills", id: 17 },
  { genre: "Mahou Shoujo", label: "Magic & Courage", id: 66 },
  { genre: "Space", label: "Starbound Tales", id: 29 },

 
  { genre: "Otaku Culture", label: "Anime About Anime", id: 69 },
  { genre: "Gag Humor", label: "Pure Chaos", id: 57 },
  { genre: "Ecchi", label: "Playful Flirt", id: 9 },
  { genre: "Anthropomorphic", label: "Humanlike Creatures", id: 51 },
  { genre: "Delinquents", label: "Street Rebels", id: 55 },
  { genre: "Team Sports", label: "Teamwork Wins", id: 77 },
  { genre: "Combat Sports", label: "One vs One", id: 54 },
  { genre: "Performing Arts", label: "Stage Battles", id: 70 },
  { genre: "Showbiz", label: "Life in Spotlight", id: 75 },


  { genre: "Avant Garde", label: "Bold Art", id: 5 },
  { genre: "Award Winning", label: "Critic Favorites", id: 46 },
  { genre: "Gourmet", label: "Food Stories", id: 47 },
  { genre: "Medical", label: "Healing Lives", id: 67 },
  { genre: "Pets", label: "Cute Companions", id: 71 },
  { genre: "Childcare", label: "Warm Parenting", id: 53 },
  { genre: "Visual Arts", label: "Artful Tales", id: 80 },
  { genre: "Video Game", label: "Game Worlds", id: 79 },
  { genre: "Workplace", label: "Life at Work", id: 48 },


  { genre: "Crossdressing", label: "Style & Identity", id: 81 },
  { genre: "Reverse Harem", label: "Many Admirers", id: 73 },
  { genre: "Magical Sex Shift", label: "Transforming Magic", id: 65 },
  { genre: "Erotica", label: "Mature Passion", id: 49 }
];
