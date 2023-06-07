import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

function about() {
  return <Layout>  <div className="flex items-right   float-right flex-grow pl-12" style={{ marginLeft: '5%', marginRight: '5%' }}>
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
<div></div><br/>
         
                              </div>
  
  
  <div className="">
  <div>                                       </div>
             <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">About Us</h1>
                      <img style={{width:"50%",float:"left"}} src="https://res.cloudinary.com/masterdevs/image/upload/v1686134248/feature1_afvlur.png"/>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                       </div>
  <div>
</div>
  
  </Layout>;
}

export default about;
