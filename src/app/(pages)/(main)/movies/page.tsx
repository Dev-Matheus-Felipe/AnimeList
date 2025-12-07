import AnimesContainer from '@/components/animes/animesSectionContainer/animesContainer';
import SectionsLoading from '@/components/loadings/sectionsLoading';
import BannerComponent from '@/components/bannerComponent/banner';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata  = {
  title: "Movies",
  description: "Explore all anime movies categories, discover new titles, and save your favorites."
}

export default async function Movies() {

  return (
    <div className="movies">
      <BannerComponent route='movies'/>
      
      <Suspense fallback={<SectionsLoading />}>
        <AnimesContainer type='movie' />
      </Suspense>
    </div>
  );
}