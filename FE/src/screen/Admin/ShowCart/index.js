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
        ? response.data.data.sort((a, b) => new Date(b.items[0].date) - new Date(a.items[0].date))
        : [];
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setPosts([]);
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
        <div className="header-item flex-grow-2">SẢN PHẨM - SỐ LƯỢNG - Ngày</div>
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
                .map((item, itemIndex) => (
                  <div key={itemIndex} className="item-row col-12">
                    <div className="item">{item.title}</div>
                    <div className="item">{item.quantity}</div>
                    <div className="item">
                      {new Date(item.date).toLocaleDateString("vi-VN", { weekday: 'long' })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowCart;
