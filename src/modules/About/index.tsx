import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const About: React.FC = () => {
    return (
        <>
        <Typography variant="h2">
            about
        </Typography>
        <Link to="/">home</Link>
        </>
    )
}

export default About;
