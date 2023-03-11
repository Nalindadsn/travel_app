import { Swiper, SwiperSlide } from 'swiper/react';

//Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper';
import Image from 'next/image';

//import {  Pagination } from 'swiper';
// import './styles.css';

export default function SliderMain({ featured }) {

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={10}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      className="mySwiper"
    >
      {featured.map((product) => (
        <SwiperSlide key={product._id}>
          <li className="mt-10 card animate__animated animate__fadeIn animate__delay-4s bg-gray-800">
            <main className="space-y-3 px-1">
              <div className="space-y-2">
                <h4 className="text-sm capitalize text-gray-200 w-full text-left font-bold ">
                  {product.name}
                </h4>
                <div>
                  <ul className="flex items-center space-x-1">
                    <li className="w-2 h-2 rounded-full bg-gray-200"></li>
                    <li className="w-2 h-2 rounded-full bg-gray-200"></li>
                    <li className="w-2 h-2 rounded-full bg-gray-300"></li>
                    <li className="w-2 h-2 rounded-full bg-gray-300"></li>
                    <li className="w-2 h-2 rounded-full bg-gray-300"></li>
                  </ul>
                </div>
              </div>
              <div>
              {product.image.substring(0,23)=="https://www.youtube.com" ? (
            
            <Image
            width="300"
            height="300"
            src="https://res.cloudinary.com/masterdevs/image/upload/v1678550390/video_logo_iwv7ux.jpg"
            alt={product.name}
            className="rounded shadow object-cover h-80 w-full p-2 m-4"
          />
            ):(

                <Image
                  width="300"
                  height="300"
                  src={product.image}
                  alt={product.name}
                  className="rounded shadow object-cover h-80 w-full p-2 m-4"
                />
            )}
                
                
                {' '}
              </div>
            </main>
          </li>
          {/* 
          <Image
            width="300"
            height="300"
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-80 w-full p-2 m-4"
          />{' '} */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
