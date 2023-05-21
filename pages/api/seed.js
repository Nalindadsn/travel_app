import Post from '../../models/Post';
import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';
const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Post.deleteMany();
  await Post.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
