import AnimesContainer from '@/components/animes/animesSectionContainer/animesContainer';
import SectionsLoading from '@/components/loadings/sectionsLoading';
import BannerComponent from '@/components/bannerComponent/banner';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home",
  description: "Explore all anime categories, discover new titles, and save your favorites."
}

export default async function Home() {

  return (
    <div className="home">
      <BannerComponent route='home'/>

      <Suspense fallback={<SectionsLoading />}>
        <AnimesContainer type='tv' />
      </Suspense>
    </div>
  );
}