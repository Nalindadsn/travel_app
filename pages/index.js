import axios from 'axios';
import Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Slider from '../components/Slider';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ topRatedProducts, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
      <section
        className=" bg_asia grid grid-cols-2"
        style={{
          height: '36rem',
          backgroundImage:
            "url('https://res.cloudinary.com/masterdevs/image/upload/v1665031819/asia_aqo5gj.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <main className="flex flex-col justify-around pl-20">
          <div className="text-5xl font-extrabold -mt-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-200 capitalize tracking-wider font_ animate__animated animate__fadeIn animate__delay-2s">
              {/* australia */}
            </span>
          </div>

          <div className="text-7xl font-extrabold tracking-wider animate__animated animate__fadeIn animate__delay-3s">
            <span className="bg-clip-text text-transparent text-gray-100 capitalize font_">
              Sri Lanka
            </span>

            <p className="text-xs text-gray-300 w-96 font-medium mt-7  drop-shadow-lg shadow-black">
              Sri Lanka, formerly known as Ceylon and officially the Democratic
              Socialist Republic of Sri Lanka, is an island country in South
              Asia.
            </p>
          </div>

          <div className="text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-200 tracking-wider capitalize font_ animate__animated animate__fadeIn animate__delay-2s">
              Sri Lanka/ Coordinates 7.8731° N, 80.7718° E
            </span>
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
                            Shop
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
              <li className="mt-10 card animate__animated animate__fadeIn animate__delay-4s">
                <main className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm capitalize text-gray-200 w-full">
                      text
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
                    <img
                      src="https://res.cloudinary.com/masterdevs/image/upload/v1665031819/asia_aqo5gj.jpg"
                      alt="beach"
                      className="bg_common"
                    />
                  </div>
                </main>
              </li>
              <li className="mt-10 card animate__animated animate__fadeIn animate__delay-4s">
                <main className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm capitalize text-gray-200 w-full">
                      text
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
                    <img
                      src="https://res.cloudinary.com/masterdevs/image/upload/v1665031819/asia_aqo5gj.jpg"
                      alt="beach"
                      className="bg_common"
                    />
                  </div>
                </main>
              </li>

              <li className="mt-10 card animate__animated animate__fadeIn animate__delay-3s ">
                <main className="space-y-3 ">
                  <div className="space-y-2">
                    <h4 className="text-sm capitalize text-gray-200 w-full">
                      text
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
                    <img
                      src="https://res.cloudinary.com/masterdevs/image/upload/v1665031819/asia_aqo5gj.jpg"
                      alt="tea Plantation sri Lanka"
                      className="bg_common"
                    />
                  </div>
                </main>
              </li>
            </ul>
          </section>

          <div className="flex items-center space-x-3 animate__animated animate__fadeIn animate__delay-5s">
            <button className="focus:outline-none w-9 h-9 bg-transparent rounded-full border border-gray-400 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <button className="focus:outline-none w-9 h-9 bg-transparent rounded-full border border-gray-400 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </main>
      </section>

      <Slider featured={featuredProducts} />
      <br />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {topRatedProducts.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
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
