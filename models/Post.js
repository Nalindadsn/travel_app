import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    numReviewsOne: { type: Number, required: true, default: 0 },
    numReviewsTwo: { type: Number, required: true, default: 0 },
    numReviewsThree: { type: Number, required: true, default: 0 },
    numReviewsFour: { type: Number, required: true, default: 0 },
    numReviewsFive: { type: Number, required: true, default: 0 },

    description: { type: String, required: true },

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Post =
  mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
