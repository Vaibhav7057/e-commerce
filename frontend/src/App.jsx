import React, { useState } from "react";
import Loader from "./components/Loader";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [product, setProduct] = useState({});

  function handlechange(e) {
    if (photos.length > 4) {
      e.target.value = "";
      return;
    }
    const sphotos = e.target.files;
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
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    await axios
      .post("/api/product/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPhotos([]);
        setPhotos({});
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
    <div className="flex flex-col">
      <input type="file" multiple onChange={handlechange} />
      <label htmlFor="productName">Product Name</label>
      <input
        type="text"
        name="productName"
        id="productName"
        value={product.productName || ""}
        onChange={handleProduct}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={product.description || ""}
        onChange={handleProduct}
      />
      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        id="category"
        value={product.category || ""}
        onChange={handleProduct}
      />
      <label htmlFor="price">Price</label>
      <input
        type="text"
        name="price"
        id="price"
        value={product.price || ""}
        onChange={handleProduct}
      />

      <div className="flex flex-wrap gap-3 ">
        {photos.length > 0 &&
          photos.map((e, i) => (
            <div key={i + 5}>
              <img src={URL.createObjectURL(e)} alt="lvda" width="200px" />{" "}
              <button onClick={() => handleDelete(i)}>delete</button>
            </div>
          ))}
      </div>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default App;
