import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Post from '../../models/Post';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import axios from 'axios';
import Stars from '../../components/Stars';

export default function PostScreen(props) {
  const { data: session } = useSession();
  //console.log(session.user._id);
  const { post } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const addToSaveHandler = async () => {
    const existItem = state.save.saveItems.find((x) => x.slug === post.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...post, quantity } });
    router.push('/save');
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/posts/${post._id}/reviews`,
        {
          rating,
          comment,
        }
        // {
        //   headers: { authorization: `Bearer ${userInfo.token}` },
        // }
      );
      setLoading(false);
      //enqueueSnackbar('Review submitted successfully', { variant: 'success' });

      toast.success('Review submitted successfully');
      fetchReviews();
    } catch (err) {
      setLoading(false);

      toast.success(err);
    }
  };
  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/posts/${post._id}/reviews`);
      setReviews(data);
    } catch (err) {
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }, [post._id]);
  // const dateString = '2020-05-14T04:00:00Z'

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const lazyRoot = React.useRef(null);

const isYoutube=post.image.substring(0,23)=="https://www.youtube.com"

  useEffect(() => {
    // async () => {
    fetchReviews();
  }, [fetchReviews]);
  if (!post) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }
  return (
    <Layout title={post.name}>
      
      <div
        className="py-2 bg-white"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
                  <div className="flex">
                    <div className=""></div>

                    <div className="flex items-right  float-right flex-grow pl-12">
                      <div className="w-full text-right">
                        <Link href="/">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-lisgt-900 px-2 transition">
                            Home
                          </a>
                        </Link>
                        <Link href="/search">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-light-800 px-2 transition">
                            Places
                          </a>
                        </Link>
                        <Link href="/imageGallery">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-light-800 px-2 transition">
                            Images
                          </a>
                        </Link>
                        <Link href="/videoGallery">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-light-800 px-2 transition">
                            Videos
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>

        <Link href="/">back to Home</Link>
      </div>
      <div
        className="grid md:grid-cols-3 md:gap-2 bg-white p-2"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
        <div className="md:col-span-2" ref={lazyRoot}>

          {isYoutube ? (
            
          <div className="aspect-w-16 aspect-h-9">
  <iframe src={post.image} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
</div>
          ):(

            <Image
            src={post.image}
            alt={post.name}
            lazyRoot={lazyRoot}
            width={1024}
            height={683}
            layout="responsive"
            priority={42}
          ></Image> 
          )}
        
         
        </div>
        <div>
          <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white pb-5">
            {post.name}
          </h1>
          <h3>Category: {post.category}</h3>

          {/* //////////////////////////////////////////// */}

          <div className="flex items-center mb-3 mt-4">
            {Math.floor(post.rating) >= 1 ? (
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            )}
            {Math.floor(post.rating) >= 2 ? (
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            )}
            {Math.floor(post.rating) >= 3 ? (
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            )}
            {Math.floor(post.rating) >= 4 ? (
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            )}
            {Math.floor(post.rating) >= 5 ? (
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            )}

            <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
              {post.rating} out of 5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {post.numReviews} global ratings
          </p>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              5 star
            </span>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-green-600 rounded"
                style={{
                  width:
                    (post.numReviewsFive / post.numReviews) * 100 + '%',
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {Math.round((post.numReviewsFive / post.numReviews) * 100)}%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              4 star
            </span>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-green-500 rounded"
                style={{
                  width:
                    (post.numReviewsFour / post.numReviews) * 100 + '%',
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {Math.round((post.numReviewsFour / post.numReviews) * 100)}%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              3 star
            </span>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-400 rounded"
                style={{
                  width:
                    (post.numReviewsThree / post.numReviews) * 100 + '%',
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {Math.round((post.numReviewsThree / post.numReviews) * 100)}
              %
            </span>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              2 star
            </span>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-orange-400 rounded"
                style={{
                  width:
                    (post.numReviewsTwo / post.numReviews) * 100 + '%',
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {Math.round((post.numReviewsTwo / post.numReviews) * 100)}%
            </span>
          </div>
          <div className="flex items-center mt-4 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              1 star
            </span>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-red-400 rounded"
                style={{
                  width:
                    (post.numReviewsOne / post.numReviews) * 100 + '%',
                }}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {Math.round((post.numReviewsOne / post.numReviews) * 100)}%
            </span>
          </div>

          {/* ///////////////////////////////////////////////// */}

          <div className="card p-5">
            <div className="mb-2 flex justify-between"></div>

            <button className="primary-button " onClick={addToSaveHandler}>
              Save
            </button>
          </div>
        </div>
        <hr />
        {/* ////////////////////////////// */}
      </div>
      <div
        className="bg-white p-2"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
        <p>Description: {post.description}</p>{' '}
      </div>
      {session && !session.user.isAdmin ? (
        <form
          onSubmit={submitHandler}
          className="bg-white p-2 mt-4"
          style={{ marginLeft: '5%', marginRight: '5%' }}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Write a review
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              review
              <select
                name="review"
                id="Enter reviews"
                onChange={(e) => setRating(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div></div>
              <div>
                <button type="submit">Submit</button>

                {loading && '...'}
              </div>
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                placeholder="Type Your Comment"
                required=""
                name="review"
                id="Enter comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="-mr-1">
                <input
                  type="submit"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Post Comment"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <p variant="h2"  className="bg-white p-2 mt-4"
        style={{ marginLeft: '5%', marginRight: '5%' }}>
          Please{' '}
          <Link href={`/login?redirect=/post/${post.slug}`}>login</Link>{' '}
          to write a review
        </p>
      )}

      <div
        className="p-4 p-2 mt-2 bg-white"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
        <hr />
        {reviews.map((a) => (
          <article key={a._id} className="card p-4 p-2 bg-white">
            <div className="flex items-center mb-4 space-x-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <div className="space-y-1 font-medium dark:text-white">
                <p>
                  {a.name}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    Joined on August 2014
                  </time>
                </p>
              </div>
            </div>
            <div className="flex items-center ">
              <Stars postRating={a.rating} />
              <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                Reviewed on{' '}
                <time dateTime="2017-03-03 19:00">
                  {formatDate(a.createdAt)}
                </time>
              </h3>
            </div>
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
              {a.comment}
            </p>
          </article>
        ))}
      </div>
      {/* ////////////////////////////////////////// */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const post = await Post.findOne({ slug }, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      post: post ? db.convertDocToObj(post) : null,
    },
  };
}
