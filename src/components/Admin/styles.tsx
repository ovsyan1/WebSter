import { styled } from '@mui/system';
import {Link} from "react-router-dom";
import { TextField } from '@mui/material';

export const TextFieldWrapper = styled(TextField)({
    marginLeft: 10,
    marginTop: 15,
});

export const BodyWrapper = styled('div')({
    margin: '0px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
});

export const Container = styled('div')({
    margin: '0px 10%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
});

export const Heading = styled('div')({
    width: '100%',
    textAlign: "center",
    margin: "10px 0 20px 0",

});

export const Aside = styled('div')({
    boxSizing: "border-box",
    width: '20%',

});

export const Main = styled('div')({
    boxSizing: "border-box",
    width: '80%',
    padding: "10px",
});

export const  LinkWrapper = styled(Link)({
    textDecoration: 'none',
    color: 'black',
});

export const  ElementsList = styled('div')({
    width: '100%',
    margin: '30px 0',
});

export const  NoElements = styled('div')({
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    border: "2px dotted gray",
    fontSize: '24px',
    color: "gray",
    textTransform: "lowercase",
});


