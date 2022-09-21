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
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
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

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
