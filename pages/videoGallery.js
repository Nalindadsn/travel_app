import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
//import Pagination from '../components/Pagination';
import Pagination from "react-js-pagination";

import PostItem from "../components/PostItem";
import Post from "../models/Post";
import db from "../utils/db";
import { Store } from "../utils/Store";
import Link from "next/link";

const PAGE_SIZE = 9;

const ratings = [1, 2, 3, 4];
export default function Search(props) {
  //const classes = useStyles();
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;
  const { posts, countPosts, categories } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const [categoriesIds, setCategoriesIds] = useState([]);

  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked((value) => !value);

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
  const addToSaveHandler = async (post) => {
    const existItem = state.save.saveItems.find((x) => x._id === post._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: "CART_ADD_ITEM", payload: { ...post, quantity } });
    router.push("/save");
  };

  return (
    <Layout title="Search">
          <div className="flex"  style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <div className=""></div>

                    <div className="flex items-right  float-right flex-grow pl-12">
                      <div className="w-full text-right">
                        <Link href="/">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-lisgt-900 px-2 transition">
                            Home
                          </a>
                        </Link>
                        <Link href="/search">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-light-800 px-2 transition">
                            Places
                          </a>
                        </Link>
                        <Link href="/imageGallery">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-light-800 px-2 transition">
                            Images
                          </a>
                        </Link>
                        <Link href="/videoGallery">
                          <a className="text-gray-700 hover:border-white hover:text-gray-900 border-b border-light-800 px-2 transition">
                            Videos
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
      <div
        className="container grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative" style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
                          
        <div
          className={`col-span-1 bg-white   pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block ${
            !checked ? "hidden" : "block"
          }`}
        >
          <div className="bg-gray-900 px-4 py-2 font-bold text-white">
            
            <div className="mb-4 flex items-center">
            FILTER
             
              <div className="flex gap-2 ml-auto">
                <span className="lg:hidden">
                                  <svg onClick={toggleChecked} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-5 w-5 font-semibold hover:text-red-500 text-red-600 text-xs"><path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                </span>
              </div>
            </div>

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
         

            <button
              onClick={toggleChecked}
              className="bg-gray-700 border border-primary text-white px-10 py-3 font-medium rounded uppercase hover:bg-gray-800 hover:text-primary transition lg:hidden text-sm mr-3 focus:outline-none"
            >
              <i className="fa fa-filter"></i>
              Filter
            </button>
            {console.log(checked)}
            <select
              value={sort}
              onChange={sortHandler}
              className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="toprated">Customer Reviews</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <div className="flex gap-2 ml-auto">
              {/* <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                <i className="fas fa-th"></i>
              </div>
              <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                <i className="fas fa-list"></i>
              </div> */}
            </div>
          </div>
          <div>
            {posts.length === 0 ? "No" : countPosts} Results
            {query !== "all" && query !== "" && " : " + query}
            {category !== "all" && " : " + category}
            {brand !== "all" && " : " + brand}
            {price !== "all" && " : Price " + price}
            {rating !== "all" && " : Rating " + rating + " & up"}
            {(query !== "all" && query !== "") ||
            category !== "all" ||
            brand !== "all" ||
            rating !== "all" ||
            price !== "all" ? (
              <button
                onClick={() => router.push("/search")}
                className="ml-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xs text-xs px-1 py-0 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                X
              </button>
            ) : null}
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="group rounded overflow-hidden">
                <div>
                  <PostItem
                    post={post}
                    key={post.slug}
                    addToSaveHandler={addToSaveHandler}
                  ></PostItem>
                </div>
              </div>
            ))}
          </div>
          {posts.length === 0 ? "No" : countPosts} Results
          {/* <Pagination pages="2" /> */}
          <div className="d-flex justify-content-center mt-5 " id="pgn">
            <Pagination
              activePage={aPage}
              itemsCountPerPage={PAGE_SIZE}
              totalItemsCount={countPosts}
              onChange={handlePagination}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
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
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Post.find({image:{'$regex':'https://www.youtube.com','$options':'i'}}).distinct("category");
  const brands = await Post.find({image:{'$regex':'https://www.youtube.com','$options':'i'}}).distinct("brand");
  const postDocs = await Post.find(
    {
      image:{'$regex':'https://www.youtube.com','$options':'i'},
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countPosts = await Post.countDocuments({
  image:{'$regex':'https://www.youtube.com','$options':'i'},
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const posts = postDocs.map(db.convertDocToObj);

  return {
    props: {
      posts,
      countPosts,
      page,
      pages: Math.ceil(countPosts / pageSize),
      categories,
      brands,
    },
  };
}
