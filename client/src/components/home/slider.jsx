import { Box,Typography,styled} from '@mui/material'
import React from 'react'
import { useEffect ,useState } from 'react';
import { slideData } from '../../constants/sliderData';


const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '70vh',
  minHeight: '500px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SlideWrapper = styled(Box)(({ isactive }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: isactive === 'true' ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  zIndex: isactive === 'true' ? 2 : 1,
}));

const SlideImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

const TextOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: '#fff',
  zIndex: 3,
  padding: '0 20px',
  maxWidth: '800px',
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  fontFamily: '"Playfair Display", serif',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
  fontWeight: 400,
  margin: 0,
  textShadow: '1px 1px 6px rgba(0, 0, 0, 0.8)',
  fontFamily: '"Open Sans", sans-serif',
  letterSpacing: '0.5px',
}));

const IndicatorContainer = styled(Box)({
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '12px',
  zIndex: 4,
});

import { shouldForwardProp } from '@mui/system';

const Indicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid white',
  backgroundColor: active ? 'white' : 'transparent',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.7)',
    transform: 'scale(1.1)',
  },
}));

// Component
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      {slideData.map((slide, index) => (
        <SlideWrapper key={slide.id} isactive={(index === currentSlide).toString()}>
          <SlideImage src={slide.image} alt={slide.title} loading={index === 0 ? 'eager' : 'lazy'} />
          <TextOverlay>
            <Title variant="h2">{slide.title}</Title>
            <Subtitle variant="subtitle1">{slide.subtitle}</Subtitle>
          </TextOverlay>
        </SlideWrapper>
      ))}

      <IndicatorContainer>
        {slideData.map((_, index) => (
          <Indicator
            key={index}
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </IndicatorContainer>
    </SliderContainer>
  );
};

export default ImageSlider;