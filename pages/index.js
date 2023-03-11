import Link from 'next/link';
import { useContext } from 'react';
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
                        <Link href="imageGallery">
                          <a className="text-white hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            Images
                          </a>
                        </Link>
                        <Link href="videoGallery">
                          <a className="text-white hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            Videos
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
              <Link href="/map">
                <a className="text-white hover:text-yellow-500 drop-shadow-lg">
                  Find Location
                </a>
              </Link>
              <Link href="/map">
                <a>
                  <i className=" blink ml-3  mt-5 inline-flex items-center justify-center w-8 h-8 mr-2 text-white transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-800">
                    <i className=" fa fa-map text-yellow-500  "></i>
                  </i>
                </a>
              </Link>
            </h2>
          </div>
        </main>
      </section>
      <br />

      <div
        className="grid lg:grid-cols-3 xl:grid-cols-3 sm:grid-cols-2 gap-6"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
        
        {topRatedProducts.map((product) => (
          <div key={product._id} className="group rounded overflow-hidden">
            <div>
              <ProductItem
                product={product}
                key={product.slug}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pt-10 pb-5">
        <Link href="/search">
          <a className="bg-gray-500 px-4 py-2 text-white rounded-full">
            See More
          </a>
        </Link>
      </div>

      <section className="section--working w-full my-8 py-16" >
            <div className="container mx-auto px-3 sm:px-4 h-full">
                <div className="flex mb-4 h-full flex-col md:flex-row">
                    <div className="w-full md:w-1/2 relative order-2 md:order-2">
                        <div>
                            <div className="bg-white absolute bottom-0 right--4 shadow-full px-6 py-8 max-w-xl min-w-xl font-roboto scale-on-hover">
                                <h3 className="font-semibold text-main-blue text-lg mb-4 font-regular">OPPORTUNITIES</h3>
                                <h4 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">Working with us</h4>
                                <p className="text-gray-700 mb-4">Our expertise extends from receiving and managing cargo at the quayside to ship planning and the subsequent loading,
                                discharge and distribution of cargoes.</p>
                                <p className="text-teal-400 font-semibold text-lg">See open vacancies</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 section--working__image h-full bg-cover order-1 md:order-2"></div>
                </div>
            </div>
        </section>

      <section className="text-gray-700 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047271.299976242!2d78.46169489521603!3d7.851731513542368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1667671838120!5m2!1sen!2slk"
            style={{ filter: ' grayscale(1) contrast(1.2) opacity(0.4)' }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Sri Lanka
            </h2>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td className="font-bold">Capital</td>
                  <td>: Sri Jayawardenepura Kotte</td>
                </tr>
                <tr>
                  <td className="font-bold">Largest city</td>
                  <td>: Colombo</td>
                </tr>
                <tr>
                  <td className="font-bold">Official languages</td>
                  <td>: Sinhala , Tamil</td>
                </tr>
                <tr>
                  <td className="font-bold">Religion </td>
                  <td>
                    : 70.2% Buddhism (official)[5]
                    <br />
                    12.6% Hinduism
                    <br />
                    9.7% Islam
                    <br />
                    7.4% Christianity
                    <br />
                    0.1% Other/None
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
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
