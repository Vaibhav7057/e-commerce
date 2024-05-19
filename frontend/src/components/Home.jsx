import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let ismounted = true;
    const controller = new AbortController();

    const getProducts = () => {
      axios
        .get("/api/product/getallproducts", {
          signal: controller.signal,
        })
        .then((res) => {
          ismounted && setProducts(res.data.products);
          toast.success("Products fetched successfully !");
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
  }, []);

  return (
    <div className="bg-slate-200 w-screen min-h-screen h-auto px-6 py-4 ">
      {products.length > 0 && (
        <div className="flex flex-wrap  rounded-md gap-3 ">
          {products?.map((item, i) => (
            <div
              key={i * 31}
              className="w-[200px] h-[250px] border border-slate-500 pb-2 bg-white rounded-md overflow-hidden cursor-pointer"
              onClick={() => navigate(`/viewproduct/${item._id}`)}
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

export default Home;
