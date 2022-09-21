import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function SelectCom() {
  const [cat, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/category`);
      setCategories(data);
    } catch (err) {
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {cat.map((a, index) => (
        <Link href={'/search?category=' + a} key={index}>
          <a className="px-6 py-3 flex items-center border-gray-300 hover:bg-gray-100 transition">
            {/* <img
        src="images/icons/bed.svg"
        className="w-5 h-5 object-contain"
      /> */}
            <span className="ml-6 text-gray-600 text-sm">{a}</span>
          </a>
        </Link>
      ))}
    </>
  );
}

export default SelectCom;
