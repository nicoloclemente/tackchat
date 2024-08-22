import React from 'react';
import { isMobile } from 'react-device-detect';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

const Home = () => {
    return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;
