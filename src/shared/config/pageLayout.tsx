import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import bannerImage from '../../assets/images/banner.jpg';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
    banner?: string;
}

const AnimationContainer = styled(Box)({
    animation: 'fadeIn 1s',
    "@keyframes fadeIn": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
    }
});

const SplashContainer = styled(Box)<{ banner?: string }>({
    width: '100%',
    height: '400px',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
}, props => ({
    background: `url(${props.banner || bannerImage})`
}));

const ImageText = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    fontSize: '50px',
    marginTop: '320px',
    marginLeft: '20px',
    fontWeight: '700',
    zIndex: '999',
    color: theme.palette.custom.base.white,
    animation: 'fadeIn 2s',
    "@keyframes fadeIn": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
    }
}));

const MobileImageText = styled(ImageText)({
    marginTop: '256px',
});

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, banner }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const TextComponent = isMobile ? MobileImageText : ImageText;

    return (
        <AnimationContainer>
            <TextComponent>{title}</TextComponent>
            <SplashContainer banner={banner} />
            {children}
        </AnimationContainer>
    );
};

export default PageLayout;