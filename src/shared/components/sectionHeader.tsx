import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SectionHeaderProps {
    title: string;
    sx?: object;
}

const TitleText = styled(Typography)(({ theme }) => ({
    fontFamily: 'Poppins',
    fontWeight: 700,
    justifyContent: 'left',
    display: 'flex',
    marginBottom: '16px',
    fontSize: '42px',
}));

const AccentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    position: 'relative',
    paddingLeft: theme.spacing(5),
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: theme.palette.custom.orangePalette.background,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 12,
        width: 150,
        height: 2,
        backgroundColor: theme.palette.custom.orangePalette.background,
    },
}));

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, sx }) => (
    <Box sx={{ width: '100%' }}>
        <TitleText>{title}</TitleText>
        <AccentBox sx={sx} />
    </Box>
);

export default SectionHeader;
