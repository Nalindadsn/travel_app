import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
//import Pagination from '../components/Pagination';
import Pagination from 'react-js-pagination';

import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

const PAGE_SIZE = 9;

const ratings = [1, 2, 3, 4];
export default function Search(props) {
  //const classes = useStyles();
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',

    rating = 'all',
    sort = 'featured',
  } = router.query;
  const { products, countProducts, categories } = props;

  const filterSearch = ({
    page,
    category,

    sort,
    min,
    max,
    searchQuery,

    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const [categoriesIds, setCategoriesIds] = useState([]);

  const [aPage, setAPage] = useState(1);
  const handleCheck = (e) => {
    //console.log(e.target.value);
    let inTheState = [...categoriesIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoriesIds(inTheState);
    filterSearch({ category: inTheState, page: 1 });
  };
  // const categoryHandler = (e) => {
  //   filterSearch({ category: e.target.value });
  // };
  //   const pageHandler = (e, page) => {
  //     filterSearch({ page });
  //   };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value, page: 1 });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value, page: 1 });
  };

  const { state, dispatch } = useContext(Store);

  const handlePagination = (pageNumber) => {
    setAPage(pageNumber);
    // window.location.href will reload entire page
    // router.push(`/?page=${pageNumber}`);
    filterSearch({ page: pageNumber });
  };
  useEffect(() => {
    setCategoriesIds([]);
    //here you will have correct value in userInput
  }, []);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title="Search">
      <div className="container grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
        <div className="col-span-1 bg-white   pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block">
          <div className="bg-gray-900 px-4 py-2 font-bold text-white">
            <i className="fa fa-filter"></i> FILTER
          </div>
          <div className="divide-gray-200 divide-y space-y-5 relative px-4">
            <div className="relative">
              <div className="lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer">
                <i className="fas fa-times"></i>
              </div>

              <h3 className="text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {/* <select
                  value={category}
                  onChange={categoryHandler}
                  className="w-full"
                >
                  <option value="all">All</option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                </select> */}

                {/*  */}
                <ul>
                  {categories &&
                    categories?.map((category, index) => (
                      <li key={index}>
                        {categoriesIds.includes(category) == true ? (
                          <input
                            type="checkbox"
                            className="mr-2"
                            id="category"
                            name="category"
                            onChange={handleCheck}
                            value={category}
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            className="mr-2"
                            id="category"
                            name="category"
                            onChange={handleCheck}
                            value={category}
                          />
                        )}
                        {category}
                      </li>
                    ))}
                </ul>
                {/* {console.log(categoriesIds)}
                {console.log(categoriesIds.includes('Pants') == true)} */}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-gray-800 mb-3 uppercase font-medium">
                RATING
              </h3>
              <div className="space-y-2">
                <select
                  value={rating}
                  onChange={ratingHandler}
                  className="w-full"
                >
                  <option value="all">All</option>
                  {ratings.map((rating) => (
                    <option dispaly="flex" key={rating} value={rating}>
                      {rating}
                      -&amp; Up
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="mb-4 flex items-center">
            <button className="bg-primary border border-primary text-white px-10 py-3 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition lg:hidden text-sm mr-3 focus:outline-none">
              Filter
            </button>
            <select
              value={sort}
              onChange={sortHandler}
              className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="toprated"> Reviews</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
          <div>
            {products.length === 0 ? 'No' : countProducts} Results
            {query !== 'all' && query !== '' && ' : ' + query}
            {category !== 'all' && ' : ' + category}
            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
            {(query !== 'all' && query !== '') ||
            category !== 'all' ||
            rating !== 'all' ? (
              <button
                onClick={() => router.push('/search')}
                className="ml-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xs text-xs px-1 py-0 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                X
              </button>
            ) : null}
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={product._id} className="group rounded overflow-hidden">
                <div>
                  <ProductItem
                    product={product}
                    key={product.slug}
                    addToCartHandler={addToCartHandler}
                  ></ProductItem>
                </div>
              </div>
            ))}
          </div>
          {products.length === 0 ? 'No' : countProducts} Results
          {/* <Pagination pages="2" /> */}
          <div className="d-flex justify-content-center mt-5 " id="pgn">
            <Pagination
              activePage={aPage}
              itemsCountPerPage={PAGE_SIZE}
              totalItemsCount={countProducts}
              onChange={handlePagination}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              // overwriting the style
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50

  const order =
    sort === 'featured'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
    },
  };
}
