import { getSession } from 'next-auth/react';
import Post from '../../../../models/Post';
import db from '../../../../utils/db';
import mongoose from 'mongoose';
const handler = async (req, res) => {
  //const session = await getSession({ req });
  // if (!session || !session.user.isAdmin) {
  //   return res.status(401).send('admin signin required');
  // }
  // const { user } = session;

  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('admin signin required');
  }
  //return res.status(401).send(session.user._id);
  await db.connect();
  const product = await Post.findById(req.query.id);
  await db.disconnect();
  if (product) {
    res.send(product.reviews);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
};
const postHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send(' signin required');
  }
  // const { user } = session;
  // console.log(user);
  await db.connect();

  // return 'test';
  const product = await Post.findById(req.query.id);
  // if (product) {
  //   return res.send({ message: product });
  // } else {
  //   return res.send({ message: 'product' });
  // }
  if (product) {
    const existReview = product.reviews.find((x) => x.user == session.user._id);
    //    if (existReview) {
    // } else {
    //   return res.send({ ar: 'test', message: existReview });
    // }
    if (existReview) {
      await Post.updateOne(
        { _id: req.query.id, 'reviews._id': existReview._id },
        {
          $set: {
            'reviews.$.comment': req.body.comment,
            'reviews.$.rating': Number(req.body.rating),
          },
        }
      );

      const updatedPost = await Post.findById(req.query.id);
      updatedPost.numReviews = updatedPost.reviews.length;

      updatedPost.numReviewsOne = updatedPost.reviews.filter(
        (r) => r.rating == 1
      ).length;
      updatedPost.numReviewsTwo = updatedPost.reviews.filter(
        (r) => r.rating == 2
      ).length;
      updatedPost.numReviewsThree = updatedPost.reviews.filter(
        (r) => r.rating == 3
      ).length;
      updatedPost.numReviewsFour = updatedPost.reviews.filter(
        (r) => r.rating == 4
      ).length;
      updatedPost.numReviewsFive = updatedPost.reviews.filter(
        (r) => r.rating == 5
      ).length;
      updatedPost.rating =
        updatedPost.reviews.reduce((a, c) => c.rating + a, 0) /
        updatedPost.reviews.length;
      await updatedPost.save();

      await db.disconnect();
      return res.send({ message: 'Review updated' });
    } else {
      const review = {
        user: mongoose.Types.ObjectId(session.user._id),
        name: session.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.numReviewsOne = product.reviews.filter(
        (r) => r.rating == 1
      ).length;
      product.numReviewsTwo = product.reviews.filter(
        (r) => r.rating == 2
      ).length;
      product.numReviewsThree = product.reviews.filter(
        (r) => r.rating == 3
      ).length;
      product.numReviewsFour = product.reviews.filter(
        (r) => r.rating == 4
      ).length;
      product.numReviewsFive = product.reviews.filter(
        (r) => r.rating == 5
      ).length;

      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      await product.save();
      await db.disconnect();
      res.status(201).send({
        message: 'Review submitted',
      });
    }
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Post Not Found' });
  }
};

export default handler;
// // /api/posts/:id/reviews
// import mongoose from 'mongoose';
// import nextConnect from 'next-connect';
// import { onError } from '../../../../utils/error';
// import db from '../../../../utils/db';
// import Post from '../../../../models/Post';
// import { isAuth } from '../../../../utils/auth';

// const handler = nextConnect({
//   onError,
// });

// handler.get(async (req, res) => {
//   db.connect();
//   const product = await Post.findById(req.query.id);
//   db.disconnect();
//   if (product) {
//     res.send(product.reviews);
//   } else {
//     res.status(404).send({ message: 'Post not found' });
//   }
// });

// handler.use(isAuth).post(async (req, res) => {
//   await db.connect();
//   const product = await Post.findById(req.query.id);
//   if (product) {
//     const existReview = product.reviews.find((x) => x.user == req.user._id);
//     if (existReview) {
//       await Post.updateOne(
//         { _id: req.query.id, 'reviews._id': existReview._id },
//         {
//           $set: {
//             'reviews.$.comment': req.body.comment,
//             'reviews.$.rating': Number(req.body.rating),
//           },
//         }
//       );

//       const updatedPost = await Post.findById(req.query.id);
//       updatedPost.numReviews = updatedPost.reviews.length;
//       updatedPost.rating =
//         updatedPost.reviews.reduce((a, c) => c.rating + a, 0) /
//         updatedPost.reviews.length;
//       await updatedPost.save();

//       await db.disconnect();
//       return res.send({ message: 'Review updated' });
//     } else {
//       const review = {
//         user: mongoose.Types.ObjectId(req.user._id),
//         name: req.user.name,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//       };
//       product.reviews.push(review);
//       product.numReviews = product.reviews.length;
//       product.rating =
//         product.reviews.reduce((a, c) => c.rating + a, 0) /
//         product.reviews.length;
//       await product.save();
//       await db.disconnect();
//       res.status(201).send({
//         message: 'Review submitted',
//       });
//     }
//   } else {
//     await db.disconnect();
//     res.status(404).send({ message: 'Post Not Found' });
//   }
// });

// export default handler;
