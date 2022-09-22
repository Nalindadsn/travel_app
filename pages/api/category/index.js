import Post from '../../../models/Post';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const post = await Post.distinct('category');
  await db.disconnect();
  res.send(post);
};

export default handler;
