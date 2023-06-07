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
            "url('https://res.cloudinary.com/masterdevs/image/upload/v1686124846/3901690_tzgac8.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <main className="flex flex-col justify-around pl-0">
          <div className="text-7xl font-extrabold tracking-wider animate__animated animate__fadeIn animate__delay-3s">
            <div className="bg-clip-text text-transparent text-gray-100 capitalize font_ ml-3 ">
            <span  className="drop-shadow-lg "> ABC Institute</span>
            </div>

            {/* <p  style={{ 
  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" 
}}  className="text-xs text-gray-300 w-96 font-medium mt-7 overflow-hidden  drop-shadow-lg shadow-black ml-3">
              Sri Lanka, formerly known as Ceylon
              <br /> Some text
            </p> */}
          </div>

          <div className="text-5xl font-extrabold">
            <div className="text-white ml-3 drop-shadow-lg  ">
              Wer offering best courses
                                  in Sri Lanka
             
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
                          <a className="text-white inline-block hover:border-gray hover:text-white border-b border-lisgt-900 px-2 transition">
                            Home
                          </a>
                        </Link>
                        <Link href="/search">
                          <a className="text-white inline-block hover:border-gray hover:text-white border-b border-light-800 px-2 transition">
                            Courses
                          </a>
                        </Link>
                        <Link href="/about">
                          <a className="text-white inline-block hover:border-gray hover:text-white border-b border-light-800 px-2 transition">
                            About Us
                          </a>
                        </Link>
                        <Link href="/contact">
                          <a className="text-white inline-block hover:border-gray hover:text-white border-b border-light-800 px-2 transition">
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
              
            </h2>
          </div>
        </main>
      </section>
      <br />
        <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Courses</h1>

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
                                <p className="text-gray-700 mb-4">
                                  Dream 
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
 when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
 It has survived not only five centuries, but also the leap into electronic typesetting, 
 remaining essentially unchanged. It was popularised in the 1960s with the release of 
 Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
 software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                          </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 section--working__image h-full bg-cover order-1 md:order-2"></div>
                </div>
            </div>
        </section>

<section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form action="#" className="space-y-8">
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
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
