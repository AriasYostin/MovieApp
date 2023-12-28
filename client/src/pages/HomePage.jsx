import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from "../api/configs/tmdb.configs.js";
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs.js";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Peliculas Populares">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="Series Populares">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header="Películas mas rankeadas">
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header="Series mas Rankeadas">
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;