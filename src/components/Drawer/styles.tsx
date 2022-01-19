import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const Wrapper = styled('div')({
    width: '350px',
    textAlign: 'center',
});

export const  LinkWrapper = styled(Link)({
    textDecoration: 'none',
    color: 'black',
});
