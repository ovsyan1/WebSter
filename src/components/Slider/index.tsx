import * as React from 'react';
import { 
    SectionWrapper, 
    ImageWrapper,
    LeftArrow,
    RightArrow,
} from './styles';

export interface SliderDataType {
    img: string | undefined;
}

export interface SliderPropsTypes {
    slides: SliderDataType[]
}

const Slider: React.FC<SliderPropsTypes> = ({ slides }) => {
    const [current, setCurrent] = React.useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }


    if(!Array.isArray(slides) || slides.length <= 0){
        return null;
    }
    return (
        <SectionWrapper>
            <LeftArrow onClick={prevSlide}>prev</LeftArrow>
            <RightArrow onClick={nextSlide}>next</RightArrow>
            {slides.map((slide, index) => {
            return (
                <div key={index}>
                    {index === current && (
                      <ImageWrapper style={{ width: '250px'}} src={slide.img} alt="img" />  
                    )}
                </div>
            )})}
        </SectionWrapper>
    )
}

export default Slider;
