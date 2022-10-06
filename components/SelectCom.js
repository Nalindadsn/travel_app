import axios from 'axios';
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
      SelectCom
      {cat.map((a, index) => (
        <option className="user" key={index}>
          {a}
          {`      `}
        </option>
      ))}
    </>
  );
}

export default SelectCom;
