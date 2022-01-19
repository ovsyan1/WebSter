import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

export const Container = styled('div')({
    minHeight: '100vh',
});

export const Section = styled('div')({
    margin: '0px auto',
    minHeight: 'calc(100vh - 240px)',
    display: 'flex',
    position: 'relative',
    paddingTop: 80,
});

export const MainContainer = styled('div')(({ theme }) => ({
    background: 'white',
    boxShadow: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`,
    borderRadius: 8,
    width: 608,
    margin: 'auto',
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 32,
    paddingRight: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 288,
    },
}));

export const TypographyWrapper = styled(Typography)({
    textAlign: 'center',
});