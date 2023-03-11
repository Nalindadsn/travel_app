import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';


function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <Layout title="Favourite List">
      <h1
        className="mb-4 text-xl"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
        Favourite Places
      </h1>
      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <Link href="/">Go to Home</Link>
      </div>
      {cartItems.length === 0 ? (
        <div>Favourite List is empty.</div>
      ) : (
        <div
          className="grid md:grid-cols-4 "
          style={{ marginLeft: '5%', marginRight: '5%' }}
        >
          <div className="overflow-x-auto md:col-span-4">
            <table className="min-w-full ">
              <thead className="border-b w-full">
                <tr>
                  <th className="p-5 text-left">Place</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b hover:bg-gray-100">
                    <td>

                    {item.image.substring(0,23)=="https://www.youtube.com" ? (
            
            <div className=" w-100 ml-2">
    <iframe src="https://www.youtube.com/embed/r9jwGansp1E" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    &nbsp;
                          {item.name}
  </div>
            ):(
  

                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center hover:text-gray-900 ml-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={150}
                            height={150}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>

            )}



                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5 font-semibold hover:text-red-500 text-red-600 text-xs"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
