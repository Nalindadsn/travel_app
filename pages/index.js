import axios from 'axios';
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

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/posts/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Post is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Post added to the cart');
  };

  return (
    <Layout title="Home Page">
      <Slider featured={featuredposts} />
      <br />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {topRatedposts.map((product) => (
          <PostItem
            product={product}
            key={product.slug}
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
