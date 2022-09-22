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
const postschema = new mongoose.Schema(
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
    deliveryLocation: { type: String, default: '-' },
    saleReturns: { type: String, default: 'Not Available' },
    warranty: { type: String, default: 'Not Available' },
    cashOnDelivery: { type: Boolean, default: false },

    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    latitude: { type: String, required: true, default: '7.8731' },
    longitude: { type: String, required: true, default: '80.7718' },

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model('Post', postschema);
export default Post;
