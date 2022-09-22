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
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Favourite Places</h1>
      <Link href="/">Go Home</Link>
      {cartItems.length === 0 ? (
        <div> empty.</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-4">
            <table className="min-w-full ">
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b hover:bg-gray-100">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center hover:text-gray-900 ml-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                      <h4 className="ml-2">{item.brand}</h4>
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
