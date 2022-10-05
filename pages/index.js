import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import PostItem from '../components/PostItem';
import Slider from '../components/Slider';
import Post from '../models/Post';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ topRatedposts, featuredposts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (post) => {
    const existItem = cart.cartItems.find((x) => x.slug === post.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...post, quantity } });

    toast.success('Post added to the cart');
  };

  return (
    <Layout title="Home Page">
      <section
        className=" bg_asia grid grid-cols-2"
        style={{
          height: '36rem',
          backgroundImage:
            "url('https://res.cloudinary.com/masterdevs/image/upload/v1664983448/asia_g906aw.jpg')",
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

            <p className="text-xs text-gray-300 w-96 font-medium mt-7">
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

        <main className="pr-5 mb-10">
          <section className="py-10 mt-10">
            <ul className="flex items-center space-x-4">
              <li className="card animate__animated animate__fadeIn animate__delay-5s">
                <main className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm capitalize text-gray-200 w-full">
                      Kelingking beach, thailand
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
                  <div className="bg_bali">
                    <div className="m-3 float-right bg-gray-100 w-7 h-7 rounded-full flex items-center justify-center">
                      <button className="focus:outline-none text-gray-400 hover:text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </main>
              </li>

              <li className="mt-10 card animate__animated animate__fadeIn animate__delay-4s">
                <main className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm capitalize text-gray-200 w-full">
                      Ao Phara Nang Beach, thailand
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
                      src="https://res.cloudinary.com/masterdevs/image/upload/v1664983448/asia_g906aw.jpg"
                      alt="beach"
                      className="bg_common"
                    />
                  </div>
                </main>
              </li>

              <li className="mt-10 card animate__animated animate__fadeIn animate__delay-3s">
                <main className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm capitalize text-gray-200 w-full">
                      Tea Plantation, Sri Lanka
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
                      src="https://res.cloudinary.com/masterdevs/image/upload/v1664983448/asia_g906aw.jpg"
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

      <Slider featured={featuredposts} />
      <br />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {topRatedposts.map((post) => (
          <PostItem
            post={post}
            key={post.slug}
            addToCartHandler={addToCartHandler}
          ></PostItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredpostsDocs = await Post.find({ isFeatured: true }, '-reviews')
    .lean()
    .limit(5);
  const topRatedpostsDocs = await Post.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredposts: featuredpostsDocs.map(db.convertDocToObj),
      topRatedposts: topRatedpostsDocs.map(db.convertDocToObj),
    },
  };
}
