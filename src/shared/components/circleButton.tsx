import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CircleButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: theme.palette.custom.orangePalette.background,
    color: theme.palette.custom.base.white,
    width: '200px',
    fontFamily: 'Poppins',
    borderRadius: '50px',
    cursor: 'pointer',
    height: '50px',
    '&:hover': {
        backgroundColor: 'transparent',
        border: '2px solid',
        borderColor: theme.palette.custom.orangePalette.background,
    },
}));

export default CircleButton;
