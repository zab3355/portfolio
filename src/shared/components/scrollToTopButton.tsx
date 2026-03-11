import { Fab, styled } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ScrollToTopButtonProps } from '../types/types';

const StyledFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    zIndex: theme.zIndex.fab,
    backgroundColor: theme.palette.custom.orangePalette.background,
    color: '#fff',
    '&:hover': {
        backgroundColor: theme.palette.custom.orangePalette.backgroundHover,
        color: '#fff',
    },
}));

const ScrollToTopButton = ({ show, onClick, sx }: ScrollToTopButtonProps) => {
    if (!show) return null;

    return (
        <StyledFab
            aria-label="scroll to top"
            onClick={onClick}
            sx={sx}
        >
            <ArrowUpwardIcon />
        </StyledFab>
    );
};

export default ScrollToTopButton;
