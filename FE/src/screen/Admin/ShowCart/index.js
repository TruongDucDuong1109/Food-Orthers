import React, { useState, useEffect } from "react";
import postServices from "../../../services/postServices";
import "bootstrap/dist/css/bootstrap.min.css";
import "./showcart.css";
import { Link } from "react-router-dom";

function ShowCart() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await postServices.getCart();
      const sortedPosts = response.data.data
        ? response.data.data
            .filter((post) => post.items && post.items.length > 0) 
            .sort((a, b) => new Date(b.items[0]?.date || 0) - new Date(a.items[0]?.date || 0))
        : [];
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setPosts([]);
    }
  };

  // xóa sản phẩm
  const deleteCart = async (id) => {
    try {
      const shouldDelete = window.confirm("Bạn có chắc muốn xóa mục này?");

      if (!shouldDelete) {
        return;
      }

      const response = await postServices.deleteCart(id);

      if (response.data.success === true) {
        alert("Xóa thành công");
        window.location.reload();
      } else {
        alert("Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error.message);
      alert("Đã xảy ra lỗi khi xóa");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <Link className="navbar-brand bg-success p-2 rounded text-white" to="/home">
          Home
        </Link>
        <Link className="navbar-brand bg-warning p-2 rounded text-white" to="/admin">
          Admin
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="header d-flex">
        <div className="header-item flex-grow-1">TÊN NGƯỜI ĐẶT</div>
        <div className="header-item flex-grow-1">TỔ</div>
        <div className="header-item flex-grow-2">SẢN PHẨM - SỐ LƯỢNG - NGÀY</div>
      </div>

      {posts.map((post, index) => {
        const isEvenRow = index % 2 === 0;
        return (
          <div key={index} className={`cart-item row ${isEvenRow ? "bg-light" : ""}`}>
            <div className="item flex-grow-1">{post.fullName}</div>
            <div className="item flex-grow-1 ">{post.family}</div>
            <div className="item items-container flex-grow-2">
              {post.items
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((item, itemIndex) => {
                  const dayOfWeek = new Date(item.date).getDay();
                  const dayColors = [
                    "bg-primary",
                    "bg-success",
                    "bg-danger",
                    "bg-warning",
                    "bg-info",
                    "bg-secondary",
                    "bg-dark",
                  ];

                  return (
                    <div key={itemIndex} className="item-row col-12">
                      <div className={`item ${dayColors[dayOfWeek]}`}>{item.title}</div>
                      <div className={`item ${dayColors[dayOfWeek]}`}>{item.quantity}</div>
                      <div className={`item ${dayColors[dayOfWeek]}`}>
                        {new Date(item.date).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  );
                })}
              <div>
                <button onClick={() => deleteCart(post._id)} className="btn-delete">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowCart;
