import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

function contact() {
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
                    </div>
  
  
  <div>
                              
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                  
                              
                              
  </div>
  </Layout>;
}

export default contact;
