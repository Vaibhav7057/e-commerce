import React, { useState, useRef } from "react";
import axios from "axios";

const Addproduct = () => {
  const [photos, setPhotos] = useState([]);
  const [product, setProduct] = useState({});
  const [thumbnail, setThumbnail] = useState("");
  const imageRef = useRef();
  const thumbnailRef = useRef();

  function handlechange(e) {
    const sphotos = e.target.files;

    if (photos.length + sphotos.length > 5) {
      e.target.value = "";
      return;
    }

    setPhotos((pre) => [...pre, ...sphotos]);
    e.target.value = "";
  }

  function handleProduct(e) {
    const { name, value } = e.target;
    setProduct((pre) => ({ ...pre, [name]: value }));
  }

  function handleDelete(idx) {
    setPhotos((pre) => [...pre.filter((e, i) => i != idx)]);
  }

  async function handleSubmit(e) {
    console.log(product);
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    photos.forEach((photo) => {
      formData.append("productImages", photo);
    });

    formData.append("thumbnail", thumbnail);

    await axios
      .post("/api/product/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPhotos([]);
        setProduct({});
        setThumbnail("");
      })
      .catch((err) => {
        if (!err.response) {
          console.log("no server response");
        } else {
          console.log(err.response?.data);
        }
      });
  }

  return (
    <div className="w-screen py-7 min-h-screen flex justify-center  ">
      <div className=" w-[60%] h-auto border border-slate-400 flex flex-col py-5 px-4 bg-slate-100 ">
        <div className="flex ">
          <div className="w-[70%] flex flex-col gap-3 pr-4 ">
            <input
              type="file"
              multiple
              onChange={handlechange}
              ref={imageRef}
              className="hidden"
              accept="image/*"
            />
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              ref={thumbnailRef}
              className="hidden"
              accept="image/*"
            />

            <input
              type="text"
              name="productName"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product name"
              value={product.productName || ""}
              onChange={handleProduct}
            />
            <input
              type="text"
              name="description"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product description"
              value={product.description || ""}
              onChange={handleProduct}
            />

            <input
              type="text"
              name="category"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product category"
              value={product.category || ""}
              onChange={handleProduct}
            />

            <input
              type="text"
              name="price"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product price"
              value={product.price || ""}
              onChange={handleProduct}
            />
            <input
              type="text"
              name="stock"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product stock"
              value={product.stock || ""}
              onChange={handleProduct}
            />
            <input
              type="text"
              name="brand"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product brand"
              value={product.brand || ""}
              onChange={handleProduct}
            />
            <input
              type="text"
              name="discount"
              className="bg-slate-200 outline-none border px-3 py-2 border-slate-500 rounded-md "
              placeholder="enter product discount"
              value={product.discount || ""}
              onChange={handleProduct}
            />
          </div>
          <div className="w-[30%] px-2 ">
            {thumbnail && (
              <div className="border border-slate-400 bg-white p-2 rounded-md ">
                <img
                  src={URL.createObjectURL(thumbnail)}
                  className="rounded-md"
                  alt="lvda"
                  width="200px"
                />
                <button
                  onClick={() => setThumbnail("")}
                  className="px-2 py-1 bg-rose-600 rounded-md mt-2 text-white "
                >
                  delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 my-4">
          <div
            className="bg-blue-200 w-[60%] rounded-md py-4 text-center hover:cursor-pointer "
            onClick={() => {
              imageRef.current.click();
            }}
          >
            Select {5 - photos.length} photos
          </div>
          <div
            className="bg-violet-200 w-[40%] rounded-md  py-4  text-center hover:cursor-pointer "
            onClick={() => {
              thumbnailRef.current.click();
            }}
          >
            Select thumbnail
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full min-h-[100px] h-auto py-2 px-3 bg-slate-200 border border-slate-400 rounded-md justify-center items-center ">
          {photos.length > 0 &&
            photos.map((e, i) => (
              <div
                key={i + 5}
                className="p-2 rounded-md border border-slate-400 bg-white "
              >
                <img
                  src={URL.createObjectURL(e)}
                  alt="lvda"
                  width="100px"
                  className="rounded-md"
                />
                <button
                  onClick={() => handleDelete(i)}
                  className="p-1 bg-rose-600 rounded-md mt-2 text-white text-sm "
                >
                  delete
                </button>
              </div>
            ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 p-2 rounded-md mt-5 "
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Addproduct;
