import { styled } from '@mui/system';

export const SectionWrapper = styled('section')({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

export const ImageWrapper = styled('img')({
    width: '500px',
    height: '350px',
    borderRadius: '10px',
});

export const LeftArrow = styled('div')({
    // position: 'absolute',
    // top: '50%',
    // left: '32px',
    // fontSize: '3rem',
    // color: '#000',
    // zIndex: 10,
    cursor: 'pointer',
    userSelect: 'none',
});
export const RightArrow = styled('div')({
    // position: 'absolute',
    // top: '50%',
    // right: '32px',
    // fontSize: '3rem',
    // color: '#000',
    // zIndex: 10,
    cursor: 'pointer',
    userSelect: 'none',
});
