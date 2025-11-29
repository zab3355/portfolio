import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScrollButton = styled(Button)<ButtonProps>(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    bottom: '2rem',
    zIndex: 2,
}));

export default ScrollButton;
