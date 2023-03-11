import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const product = await Product.find({image:{'$regex':'https://www.youtube.com','$options':'i'}});
  await db.disconnect();
  res.send(product);
};

export default handler;
