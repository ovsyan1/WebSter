import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const GridItem: React.FC = () => {
    return (
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Card sx={{maxWidth: 300, height: 300}}>
            <div>
                <CardMedia 
                    component="img"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRme26WOvMv0m1Iu462Md2Y1rSXZoAPrVUB7oAaJ6lHSm6MgLRLPC7sAlvBYYeziSVQkLU&usqp=CAU" 
                    alt="blabla" 
                />
            </div>
            <CardContent>
                <Typography variant="h5">
                    title
                </Typography>
                <Typography variant="body1">
                    price: 100$
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="text">Buy</Button>
            </CardActions>
            </Card>
        </Grid>
    )
}

export default GridItem;
