import { Swiper, SwiperSlide } from 'swiper/react';

//Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper';
import Image from 'next/image';

//import {  Pagination } from 'swiper';
// import './styles.css';

export default function Slider({ featured }) {
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
      className="mySwiper bg-white"
    >
      {featured.map((post) => (
        <SwiperSlide key={post._id}>
          <Image
            width="300"
            height="300"
            src={post.image}
            alt={post.name}
            className="rounded shadow object-cover h-80 w-full p-2 m-4"
          />{' '}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
