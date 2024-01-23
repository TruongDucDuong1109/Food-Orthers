import React from "react";
import { useState } from "react";
import postServices from "../../../services/postServices";
import "./styles.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const [message, setMessage] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);

    formData.append("image", image);
    console.log(image.name);
    const response = await postServices.create(formData);

    e.target.reset();

    if (response.data.success === true) {
      setMessage("Post created successfully");
    } else {
      setMessage("Post created failed");
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  return (
    <>
      <div>
        <h1 className="d-flex justify-content-around p-3">Thêm Đồ Ăn</h1>
        <div className="container-form container d-flex justify-content-center">
          <form onSubmit={handlesubmit} className="d-flex flex-column justify-content-around formSubmit">
            <input
              type="text"
              name="title"
              placeholder="Tên món ăn"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
      

          
            <br />
            <input type="date" name="date" onChange={(e) => setDate(e.target.value)} required />
            <br />
            <label htmlFor="image" className="d-flex justify-content-center">
              Chọn ảnh
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="inputFile"
            />

            <br />
            <button type="submit" className="btn-add">
              Thêm
            </button>
            <p>{message}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
