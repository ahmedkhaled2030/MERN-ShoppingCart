// import React from "react";
// import{useState} from 'react'

// function Test() {
//     const [images, setImages] = useState([]);

//   const fileSelectedHandler = (e) => {
//     setImages( [...images, ...e.target.files] );
//     };
//     console.log(images)
//   return (
//     <div>
//       <input type="file" multiple onChange={fileSelectedHandler} />
//     </div>
//   );
// }

// export default Test;

import React from "react";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/thumbs/thumbs.min.css";
import { sliderImages } from '../../data';
import ProductImagesSlider from '../ProductImagesSlider/ProductImagesSlider'

function ProductSlider({assets}) {
// console.log(assets)
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        {
          assets ? (<ProductImagesSlider images={assets} />)   : null
        }
        
      </div>
    </div>
  );
}

export default ProductSlider;
