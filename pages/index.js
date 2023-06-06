import Link from 'next/link';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import PostItem from '../components/PostItem';

import SliderMain from '../components/Slider2';
import Post from '../models/Post';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ topRatedPosts, featuredPosts }) {
  const { state, dispatch } = useContext(Store);
  const { save } = state;

  const addToSaveHandler = async (post) => {
    const existItem = save.saveItems.find((x) => x.slug === post.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...post, quantity } });

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
            "url('https://res.cloudinary.com/masterdevs/image/upload/v1686038234/360_F_224497741_y1rCbGzkMojXEzZ1RJt7qw7I89otYltN_ue8tmt.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <main className="flex flex-col justify-around pl-0">
          <div className="text-7xl font-extrabold tracking-wider animate__animated animate__fadeIn animate__delay-3s">
            <div className="bg-clip-text text-transparent text-gray-100 capitalize font_ ml-3 shadow-md">
              Company Name
            </div>

            {/* <p className="text-xs text-gray-300 w-96 font-medium mt-7 overflow-hidden  drop-shadow-lg shadow-black ml-3">
              Sri Lanka, formerly known as Ceylon
              <br /> Some text
            </p> */}
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
              <nav className="mb-8 ">
                <div className="container">
                  <div className="flex">
                    <div className=""></div>

                    <div className="flex items-right   float-right flex-grow pl-12">
                      <div className="w-full text-right">
                        <Link href="/">
                          <a className="text-white inline-block hover:border-white hover:text-white border-b border-lisgt-900 px-2 transition">
                            Home
                          </a>
                        </Link>
                        <Link href="/search">
                          <a className="text-white inline-block hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            Services
                          </a>
                        </Link>
                        <Link href="/about">
                          <a className="text-white inline-block hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            About Us
                          </a>
                        </Link>
                        <Link href="/contact">
                          <a className="text-white inline-block hover:border-white hover:text-white border-b border-light-800 px-2 transition">
                            Contact Us
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            <ul className=" items-center space-x-4 xl:flex lg:flex md:flex  hidden ">
              <SliderMain featured={featuredPosts} />
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
        
        {topRatedPosts.map((post) => (
          <div key={post._id} className="group rounded overflow-hidden">
            <div>
              <PostItem
                post={post}
                key={post.slug}
                addToSaveHandler={addToSaveHandler}
              ></PostItem>
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
                                <h3 className="font-semibold text-main-blue text-lg mb-4 font-regular">TRAVEL</h3>
                                <h4 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">WE ARE</h4>
                                <p className="text-gray-700 mb-4">Dream 
Safari is a Dynamic Travel and Destination promoting Company. Mainly focusing on Sabaragamuwa and Uva Provinces in Sri Lanka. Our Safari Tours are well managed and structured for any type of traveller.</p>
                                
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
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3964.654725732252!2d80.8865113147703!3d6.438369995341943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjYnMTguMSJOIDgwwrA1MycxOS4zIkU!5e0!3m2!1sen!2slk!4v1678545713915!5m2!1sen!2slk"
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
  const featuredPostsDocs = await Post.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(5);
  const topRatedPostsDocs = await Post.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredPosts: featuredPostsDocs.map(db.convertDocToObj),
      topRatedPosts: topRatedPostsDocs.map(db.convertDocToObj),
    },
  };
}
