import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import SelectCom from './SelectCom';
export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (category === '') {
      router.push(`/search?query=${query}`);
    } else {
      router.push(`/search?query=${query}&category=${category}`);
    }
  };

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  function Loading() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const handleStart = (url) => url !== router.asPath && setLoading(true);
      const handleComplete = (url) =>
        url === router.asPath &&
        setTimeout(() => {
          setLoading(false);
        }, 5000);

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);

      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    });

    return (
      loading && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      )
    );
  }
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        {/* ///////////////////////////////////////////////// */}

        <header className="px-7 py-3.5 shadow">
          <nav className="animate__animated animate__fadeInLeft">
            <main className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="text-md">
                  <Link href="/">
                    <a>Travel</a>
                  </Link>
                </span>
              </div>
              <div className="w-full xl:max-w-xl lg:max-w-lg lg:flex relative hidden">
                <form className="flex items-center" onSubmit={submitHandler}>
                  <div className="inline-block relative ">
                    <select
                      onChange={categoryChangeHandler}
                      className="block appearance-none w-15 bg-white border border-lime-400 hover:border-lime-500 px-4 py-2.5 pr-8  shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value=""> {`All         `}</option>
                      <SelectCom />
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ml-2 text-lime-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center  pointer-events-none"></div>
                    <input
                      id="simple-search"
                      className="bg-lime-50 border border-lime-300 text-lime-900 text-sm focus:ring-lime-500 focus:border-lime-500 block w-full  p-2.5  dark:bg-lime-700 dark:border-lime-600 dark:placeholder-lime-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                      placeholder="Search..."
                      onChange={queryChangeHandler}
                      required
                      type="text"
                      name="max"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 ml-1 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>

              <div className="flex items-center space-x-5">
                <div>
                  <Link href="/cart">
                    <a className="p-2 text-white  hover:text-white hover:bg-gray-800  bg-black">
                      Saved
                      {cartItemsCount > 0 && (
                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                          {cartItemsCount}
                        </span>
                      )}
                    </a>
                  </Link>
                </div>
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block  z-50">
                    <Menu.Button className="p-2 text-white  hover:text-white hover:bg-gray-800  bg-black ">
                      Hello, {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <a className="p-2 text-white hover:border-white hover:text-white border border-lime-300">
                      Login
                    </a>
                  </Link>
                )}
                <button className="focus:outline-none bg-gray-100 text-gray-400 hover:text-gray-800 w-7 h-7 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </main>
          </nav>
        </header>

        {/* //////////////////////////////////////////////// */}

        {/* <header>
          <nav className="bg-gray-800 hidden lg:block">
            <div className="container">
              <div className="flex">
                <div className="px-8 py-1 bg-primary flex items-center cursor-pointer group relative">
                  <span className="text-white">
                    <i className="fas fa-bars"></i>
                  </span>
                  <span className="capitalize ml-2 text-white">
                    All categories
                  </span>
                  <div className="absolute left-0 top-full w-full divide-gray-300 divide-dashed divide-y bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
                    <NavCatCom />
                  </div>
                </div>

                <div className="flex items-center justify-between flex-grow pl-12">
                  <div className="flex items-center space-x-1 text-base capitalize">
                    <Link href="/">
                      <a className="text-white hover:border-white hover:text-white border border-gray-800 px-2 transition">
                        Home
                      </a>
                    </Link>
                    <Link href="/search">
                      <a className="text-white hover:border-white hover:text-white border border-gray-800 px-2 transition">
                        Shop
                      </a>
                    </Link>
                    <Link href="about">
                      <a className="text-white hover:border-white hover:text-white border border-gray-800 px-2 transition">
                        About us
                      </a>
                    </Link>
                    <Link href="contact">
                      <a className="text-white hover:border-white hover:text-white border border-gray-800 px-2 transition">
                        Contact us
                      </a>
                    </Link>
                  </div>
                  {status === 'loading' ? (
                    'Loading'
                  ) : !session?.user ? (
                    <Link href="/register">
                      <a className="ml-auto justify-self-end text-gray-200 hover:text-white transition">
                        Register
                      </a>
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </nav>
          <Link href="/search">
            <a className="text-white bg-gray-900 hover:border-white hover:text-white border border-gray-800 px-2 transition">
              Shop
            </a>
          </Link>
        </header> */}
        <main className="  relative ">
          <Loading />
          {children}
        </main>
        <footer className="">
          <div className="footer-2 bg-gray-800 pt-6 md:pt-12">
            <div className="container px-4 mx-auto">
              <div className="md:flex md:flex-wrap md:-mx-4 py-6 md:pb-12">
                <div className="footer-info lg:w-1/3 md:px-4">
                  <h4 className="text-white text-2xl mb-4">
                    19K users are using Travel blocks and making their life
                    easy.
                  </h4>
                  <p className="text-gray-400">
                    We have carefully crafted the blocks to suit to everyones
                    need.
                  </p>
                  <div className="mt-4">
                    <button className="bg-facebook py-2 px-4 text-white rounded mt-2 transition-colors duration-300">
                      <span className="fab fa-facebook-f mr-2"></span> Follow
                    </button>
                    <button className="bg-twitter py-2 px-4 text-white rounded ml-2 mt-2 transition-colors duration-300">
                      <span className="fab fa-twitter mr-2"></span> Follow
                      @freeweb19
                    </button>
                  </div>
                </div>

                <div className="md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-12 lg:mt-0">
                  <div className="sm:flex">
                    <div className="sm:flex-1">
                      <h6 className="text-base font-medium text-white uppercase mb-2">
                        About
                      </h6>
                      <div>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Company
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Culture
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Team
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Careers
                        </a>
                      </div>
                    </div>
                    <div className="sm:flex-1 mt-4 sm:mt-0">
                      <h6 className="text-base font-medium text-white uppercase mb-2">
                        What we offer
                      </h6>
                      <div>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Blocks
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Resources
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Tools
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Tutorials
                        </a>
                        <a
                          href="#"
                          className="text-gray-400 py-1 block hover:underline"
                        >
                          Freebies
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
                  <h5 className="text-lg text-white font-medium mb-4">
                    Explore our site
                  </h5>
                  <button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded py-2 px-6 md:px-12 transition-colors duration-300">
                    Explore
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-solid border-gray-900 mt-4 py-4">
              <div className="container px-4 mx-auto">
                <div className="md:flex md:-mx-4 md:items-center">
                  <div className="md:flex-1 md:px-4 text-center md:text-left">
                    <p className="text-white">
                      &copy; <strong>Travel</strong>
                    </p>
                  </div>
                  <div className="md:flex-1 md:px-4 text-center md:text-right">
                    <a
                      href="#"
                      className="py-2 px-4 text-white inline-block hover:underline"
                    >
                      Terms of Service
                    </a>
                    <a
                      href="#"
                      className="py-2 px-4 text-white inline-block hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
