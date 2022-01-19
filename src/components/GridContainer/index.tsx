import * as React from 'react';
import Grid from '@mui/material/Grid';
import GridItem from '../GridItem';

const GridContainer: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
        </Grid>
    )
}

export default GridContainer;
