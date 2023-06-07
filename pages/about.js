import React from 'react';
import Layout from '../components/Layout';

function about() {
  return <Layout>  <div className="flex items-right   float-right flex-grow pl-12">
                      <div className="w-full text-right">
                        <Link href="/">
                          <a className=" inline-block hover:border-gray hover:text-gray border-b border-lisgt-900 px-2 transition">
                            Home
                          </a>
                        </Link>
                        <Link href="/search">
                          <a className=" inline-block hover:border-gray hover:text-gray border-b border-light-800 px-2 transition">
                            Courses
                          </a>
                        </Link>
                        <Link href="/about">
                          <a className=" inline-block hover:border-gray hover:text-gray border-b border-light-800 px-2 transition">
                            About Us
                          </a>
                        </Link>
                        <Link href="/contact">
                          <a className=" inline-block hover:border-gray hover:text-gray border-b border-light-800 px-2 transition">
                            Contact Us
                          </a>
                        </Link>
                      </div>
                    </div></Layout>;
}

export default about;
