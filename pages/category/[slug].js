// import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import PostItem from '../../components/PostItem';
import Post from '../../models/Post';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function Home({ posts }) {
  const { state, dispatch } = useContext(Store);
  const { save } = state;

  const addToSaveHandler = async (post) => {
    const existItem = save.saveItems.find((x) => x.slug === post.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const { data } = await axios.get(`/api/posts/${post._id}`);

    
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...post, quantity } });

    toast.success('Post added to the save');
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <PostItem
            post={post}
            key={post.slug}
            addToSaveHandler={addToSaveHandler}
          ></PostItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const { slug } = params;
  await db.connect();
  const posts = await Post.find({ category: slug }).lean();
  return {
    props: {
      posts: posts.map(db.convertDocToObj),
    },
  };
}
