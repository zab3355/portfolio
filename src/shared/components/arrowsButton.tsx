import { styled } from '@mui/material/styles';
import { ReactComponent as Arrows } from '../../assets/icons/arrows.svg';

const ArrowsButton = styled(Arrows)({
    width: '60px',
    height: '200px',
    animation: 'arrow 0s infinite',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    '& path': {
        stroke: '#FF7B00',
        fill: 'transparent',
        strokeWidth: '1px',
        animation: 'arrow 2s infinite',
    },
    "@keyframes arrow": {
        "0%": { opacity: 0 },
        "40%": { opacity: 1 },
        "80%": { opacity: 0 },
        "100%": { opacity: 0 },
    },
    "@-webkit-keyframes arrow": {
        "0%": { opacity: 0 },
        "40%": { opacity: 1 },
        "80%": { opacity: 0 },
        "100%": { opacity: 0 },
    },
    "& path.a1": {
        animationDelay: "-1s",
        WebkitAnimationDelay: "-1s",
    },
    "& path.a2": {
        animationDelay: "-0.5s",
        WebkitAnimationDelay: "-0.5s",
    },
    "& path.a3": {
        animationDelay: "0s",
        WebkitAnimationDelay: "0s",
    },
});

export default ArrowsButton;
