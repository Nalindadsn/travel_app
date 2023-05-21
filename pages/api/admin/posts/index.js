import { getSession } from 'next-auth/react';
import Post from '../../../../models/Post';
import db from '../../../../utils/db';
const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newPost = new Post({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image:
      'https://res.cloudinary.com/masterdevs/image/upload/v1640231057/codeaddon/codeaddon-image-icon_kr49bo.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });

  const product = await newPost.save();
  await db.disconnect();
  res.send({ message: 'Post created successfully', product });
};
const getHandler = async (req, res) => {
  await db.connect();
  const products = await Post.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;
