import { getSession } from 'next-auth/react';
import Post from '../../../../../models/Post';
import db from '../../../../../utils/db';
const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const post = await Post.findById(req.query.id);
  await db.disconnect();
  res.send(post);
};
const putHandler = async (req, res) => {
  await db.connect();
  const post = await Post.findById(req.query.id);
  if (post) {
    post.name = req.body.name;
    post.slug = req.body.slug;
    post.price = req.body.price;
    post.category = req.body.category;
    post.image = req.body.image;
    post.brand = req.body.brand;
    post.countInStock = req.body.countInStock;
    post.description = req.body.description;
    await post.save();
    await db.disconnect();
    res.send({ message: 'Post updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Post not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const post = await Post.findById(req.query.id);
  if (post) {
    await post.remove();
    await db.disconnect();
    res.send({ message: 'Post deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Post not found' });
  }
};
export default handler;
