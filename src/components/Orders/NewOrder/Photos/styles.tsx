import { styled } from '@mui/system';

export const Container = styled('div')({
    margin: '0px',
});

export const TypographyWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const PhotosBodyWrapper = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "10px",
    backgroundColor: '#fafafa',
});

export const DottedBorder = styled('div')({
    display: 'flex',
    border: '2px dotted gray',
    width: '100%',
    minHeight: '100px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "10px",

});

export const PhotosHeader = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: "10px 0",

});
