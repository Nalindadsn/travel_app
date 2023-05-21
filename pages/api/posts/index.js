import Post from '../../../models/Post';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const post = await Post.find({image:{'$regex':'https://www.youtube.com','$options':'i'}});
  await db.disconnect();
  res.send(post);
};

export default handler;
