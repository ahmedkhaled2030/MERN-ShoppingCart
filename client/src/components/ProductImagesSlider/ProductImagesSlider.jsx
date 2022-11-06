import "./ProductImagesSlider.css";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";

import ReactImageMagnify from "react-image-magnify";

import { useState, useRef } from "react";

const Container = styled.div`

`;

const ProductImagesSlider = ({images}) => {
 
//   console.log(images)

  const [img, setImg] = useState(images[0]);
  const hoverHandler = (image, i) => {
      setImg(image);
      refs?.current[i]?.classList?.add('active');
      for (var j = 0; j < images.length; j++) {
          if (i !== j  ) {
              refs?.current[j]?.classList?.remove('active');
          }
      }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
      if (el && !refs.current.includes(el)) {
          refs.current.push(el);
      }
  };


  return (
    <div className="container">
    <div className="left">
    <div className="left_1">
                  {images.map((image, i) => (
                      <div
                          className={i == 0 ? 'img_wrap active' : 'img_wrap'}
                          key={i}
                          onMouseOver={() => hoverHandler(image, i)}
                          ref={addRefs}
                      >
                          <img src={image} alt="" />
                      </div>
                  ))}
              </div>
      <div className="left_2">
                  <ReactImageMagnify
                      {...{
                          smallImage: {
                              alt: 'Wristwatch by Ted Baker London',
                              isFluidWidth: true,
                              src: img,
                          },
                          largeImage: {
                              src: img,
                              width: 1200,
                              height: 1800,
                          },
                        
                          
                      }}
                  />
              </div>
    </div>

  
  </div>
  );
};

export default ProductImagesSlider;
