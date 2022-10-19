import Link from 'next/link';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';

import SliderMain from '../components/Slider2';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ topRatedProducts, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Saved');
  };
  const [lt, setLt] = useState('');
  const myL = () => {
    const status = document.querySelector('.status');
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLt(latitude + ' ' + longitude);
    };
    const error = () => {
      status.textContent = 'unable to retrive your location';
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };
  return (
    <Layout title="Home Page">
      <section
        className=" bg_asia grid grid-cols-2"
        style={{
          height: '36rem',
          backgroundColor: '#333',
          backgroundImage:
            "url('https://res.cloudinary.com/masterdevs/image/upload/v1665031819/asia_aqo5gj.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <main className="flex flex-col justify-around pl-0">
          <div className="text-7xl font-extrabold tracking-wider animate__animated animate__fadeIn animate__delay-3s">
            <div className="bg-clip-text text-transparent text-gray-100 capitalize font_ ml-3">
              Sri Lanka
            </div>

            <p className="text-xs text-gray-300 w-96 font-medium mt-7 overflow-hidden  drop-shadow-lg shadow-black ml-3">
              Sri Lanka, formerly known as Ceylon
              <br /> and officially the Democratic Socialist Republic of Sri
              Lanka, is an island country in South Asia.
            </p>
          </div>

          <div className="text-5xl font-extrabold">
            <div className=" ml-3 bg-clip-text text-transparent bg-gradient-to-b from-gray-200 tracking-wider capitalize font_ animate__animated animate__fadeIn animate__delay-2s">
              {`Sri Lanka/ Coordinates 
                  7.8731° N, 80.7718° E
             `}
            </div>
          </div>
        </main>

        <main className="pr-5 mb-15">
          <section className="">
            <header>
              <nav className="mb-8 hidden lg:block">
                <div className="container">
                  <div className="flex">
                    <div className=""></div>

                    <div className="flex items-right  float-right flex-grow pl-12">
                      <div className="w-full text-right">
                        <Link href="/">
                          <a className="text-white hover:border-white hover:text-white border-b border-lisgt-900 px-2 transition">
                            Home
                          </a>
                        </Link>
                        <Link href="/search">
                          <a className="text-white hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            Places
                          </a>
                        </Link>
                        <Link href="about">
                          <a className="text-white hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            About us
                          </a>
                        </Link>
                        <Link href="contact">
                          <a className="text-white hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            Contact us
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <ul className=" items-center space-x-4 xl:flex lg:flex md:flex  hidden ">
              <SliderMain featured={featuredProducts} />
            </ul>
          </section>

          <div className="flex items-center space-x-3 animate__animated animate__fadeIn animate__delay-5s">
            <h2 className="font-bold text-white text-xl">
              Find Location
              <Link href="/map">
                <a>
                  <i className="ml-3  mt-5 inline-flex items-center justify-center w-8 h-8 mr-2 text-white transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-800">
                    <i className=" fa fa-map text-yellow-500  "></i>
                  </i>
                </a>
              </Link>
            </h2>
          </div>
        </main>
      </section>
      <br />
      <div className="cgrid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {topRatedProducts.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
      test
      <button onClick={() => myL()}>Location</button>
      {lt ? ' ' + lt : 'no'}
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(5);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
