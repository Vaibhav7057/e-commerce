import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Addproduct from "./Addproduct";

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [callProducts, setCallProducts] = useState(false);

  useEffect(() => {
    let ismounted = true;
    const controller = new AbortController();

    const getProducts = () => {
      axios
        .get("/api/product/getallproducts", {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          ismounted && setProducts(res.data.products);
          toast.success(res.data.message);
        })
        .catch((err) => {
          let error = err.response?.data;
          if (!error) {
            toast.error(err.response?.statusText);
          } else {
            toast.error(error.message);
          }
        });
    };
    getProducts();
    return () => {
      controller.abort();
      ismounted = false;
    };
  }, [callProducts]);

  return (
    <div className="w-full h-full flex gap-2 flex-col p-2 bg-slate-400 overflow-y-scroll ">
      <div className="flex justify-between px-3 py-1 bg-white rounded-md ">
        <p>all products</p>{" "}
        <button className="px-2 py-1" onClick={() => setShow(true)}>
          add product
        </button>
      </div>
      {show && <Addproduct setShow={setShow} productsCall={setCallProducts} />}
      {products.length > 0 && (
        <div className="flex flex-wrap  rounded-md gap-3 ">
          {products?.map((item, i) => (
            <div
              key={i * 31}
              className="w-[200px] h-[250px] border border-slate-500 pb-2 bg-white rounded-md overflow-hidden"
            >
              <div className="w-full h-[150px] ">
                <img
                  src={item?.thumbnail ?? "/images/user.png"}
                  alt="admin photo"
                  className="w-full"
                />
              </div>
              <p className="px-2 mt-2">{item.title}</p>
              <p className="px-2 mt-2">{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllProducts;
