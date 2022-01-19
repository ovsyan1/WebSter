import * as React from 'react';
import Header from '../../components/Header';
import Container from '@mui/material/Container';
import GridContainer from '../../components/GridContainer';
import { Link } from 'react-router-dom';

const ListItems: React.FC = () => {
    return (
        <>
        <Header />
        <Container sx={{mt: '1rem'}}>
            <GridContainer />
        </Container>
        <Link to="/">home</Link>
        </>
    )
}

export default ListItems;
