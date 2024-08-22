import React from 'react';
import { isMobile as isMobileDevice, isTablet } from 'react-device-detect';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

// Custom function to check if the device is a phone and not a tablet
const isPhone = () => isMobileDevice && !isTablet;

const Home = () => {
    return isPhone() ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;