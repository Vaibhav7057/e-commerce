import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ViewProduct = ({ role = "admin" }) => {
  const [product, setProduct] = useState({});
  const [viewImage, setViewImage] = useState("");
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((pre) => ({ ...pre, [name]: value }));
  }

  useEffect(() => {
    let ismounted = true;
    const controller = new AbortController();

    const getProduct = () => {
      axios
        .get(`/api/product/getproduct/${id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          ismounted && setProduct(res.data.product);
          ismounted && setViewImage(res.data.product.thumbnail);
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
    getProduct();
    return () => {
      controller.abort();
      ismounted = false;
    };
  }, []);

  return (
    <div className="w-screen h-screen px-6 py-4 flex gap-4 bg-white">
      <div className="flex flex-col gap-4">
        <div className="w-[400px] h-[400px] ">
          <img src={viewImage} alt="product image" className="w-full h-full" />
        </div>
        {product && Array.isArray(product.images) && (
          <div className="flex gap-2 p-2">
            {product?.images.map((e, i) => (
              <div key={i * 24} className="w-[100px] h-[100px] ">
                <img
                  src={e}
                  alt="lvda"
                  className="w-full h-full cursor-pointer setActive "
                  onMouseEnter={() => setViewImage(e)}
                />
              </div>
            ))}{" "}
          </div>
        )}
      </div>
      <div className="text-black flex flex-col gap-4 px-4 py-2 ">
        <input
          type="text"
          name="title"
          value={product.title || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          value={product.price || ""}
          readOnly={!edit}
          className="text-extrabold text-3xl border-none"
          onChange={handleChange}
        />
        <input
          type="text"
          name="discountPercentage"
          value={product.discountPercentage || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />
        <input
          type="text"
          name="discription"
          value={product.discription || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />
        <input
          type="text"
          name="brand"
          value={product.brand || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={product.category || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />

        <input
          type="text"
          name="rating"
          value={product.rating || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />
        <input
          type="text"
          name="stock"
          value={product.stock || ""}
          readOnly={!edit}
          className=" text-xl  border-none "
          onChange={handleChange}
        />

        {role === "admin" && (
          <button
            className="py-1 px-3 block rounded-full bg-yellow-500 font-bold border border-red-700"
            onClick={() => setEdit(true)}
          >
            Edit product
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
