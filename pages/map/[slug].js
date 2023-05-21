import React, { useContext, useState, useRef } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Post from '../../models/Post';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import axios from 'axios';

const center = { lat: 6.9271, lng: 79.8612 };

export default function PostScreen(props) {
  const { data: session } = useSession();
  //console.log(session.user._id);
  const { post } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const addToSaveHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === post.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...post, quantity } });
    router.push('/cart');
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/post/${post._id}/reviews`,
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
    } catch (err) {
      setLoading(false);

      toast.success(err);
    }
  };

  // const dateString = '2020-05-14T04:00:00Z'

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBL0oWpwIfqtwhIzyb-6pOz4SkXmow4-6I',
    libraries: ['places'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return '...';
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   setDistance('');
  //   setDuration('');
  //   originRef.current.value = '';
  //   destiantionRef.current.value = '';
  // }

  if (!post) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }
  return (
    <Layout title={post.name}>
      <div className="py-2">
        <div>
          <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white pb-5">
            <div style={{ height: '100vh', width: '100%' }}>
              <div
                style={{
                  position: 'relative',
                  height: '100vh',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,.5)',
                    width: '50%',
                    top: '0',
                    right: '0',
                    zIndex: '1000',
                  }}
                >
                  <div spacing={2} justifyContent="space-between">
                    <div flexGrow={1}>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Origin"
                          ref={originRef}
                        />
                      </Autocomplete>
                    </div>
                    <div flexGrow={1}>
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Destination"
                          ref={destiantionRef}
                        />
                      </Autocomplete>
                    </div>
                    <div
                      p={4}
                      borderRadius="lg"
                      m={4}
                      bgColor="white"
                      shadow="base"
                      minW="container.md"
                      zIndex="1"
                    ></div>
                    <div>
                      <button type="submit" onClick={calculateRoute}>
                        Calculate Route
                      </button>
                    </div>
                    <div>
                      <div>Distance: {distance} </div>
                      <div>Duration: {duration} </div>

                      <span
                        onClick={() => {
                          map.panTo(center);
                          map.setZoom(6);
                        }}
                      >
                        Icon
                      </span>
                    </div>
                  </div>
                </div>

                <GoogleMap
                  center={center}
                  zoom={6}
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                  onLoad={(map) => setMap(map)}
                >
                  <Marker position={center} />
                  {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                  )}
                </GoogleMap>
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '500px',
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* Google Map div */}
              </div>
            </div>

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
            <button
              className="primary-button w-full"
              onClick={addToSaveHandler}
            >
              Add to Favourite List
            </button>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 bg-white p-2">
        <hr />
        {/* ////////////////////////////// */}
      </div>
      {session && !session.user.isAdmin ? (
        <form onSubmit={submitHandler} className="bg-white p-2 mt-4">
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
        <p variant="h2">
          Please{' '}
          <Link href={`/login?redirect=/post/${post.slug}`}>login</Link>{' '}
          to write a review
        </p>
      )}
      <hr />
      <div className="p-4 p-2 mt-2 bg-white"></div>
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
