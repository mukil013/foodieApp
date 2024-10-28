import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavBar from '../components/NavBar';

const images = [
  'https://img.freepik.com/free-vector/flat-design-food-sale-banner_23-2149138014.jpg',
  'https://img.freepik.com/free-psd/food-menu-restaurant-web-banner-template_120329-4907.jpg',
  'https://img.freepik.com/free-psd/food-menu-restaurant-web-banner-template_120329-4909.jpg',
  'https://img.freepik.com/free-vector/flat-design-food-banner-template_23-2149076251.jpg',
  'https://img.freepik.com/free-psd/fast-food-concept-banner-template_23-2148777967.jpg'
];

export default function Home() {
  return (
    <>
      <NavBar />
      <div className='p-2 w-full h-fit flex flex-col items-center'>
        <h1 className='text-4xl font-bold p-4'>Popular</h1>
        <div className='w-full h-1/2 overflow-hidden object-cover' id='popular'>
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
          >
            {images.map((image, index) => (
              <div key={index} className='w-full h-full'>
                <img
                  src={image}
                  alt={`Popular Image ${index + 1}`}
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            ))}
          </Carousel>
        </div>

        <h1 className='text-4xl font-bold p-4'>Trending</h1>
        <div className='w-full h-full overflow-hidden' id='trending'>
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
          >
            {images.map((image, index) => (
              <div key={index} className='w-full h-full'>
                <img
                  src={image}
                  alt={`Trending Image ${index + 1}`}
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
