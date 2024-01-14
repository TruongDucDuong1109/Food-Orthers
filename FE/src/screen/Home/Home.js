import React, { useState, useEffect } from "react";
import postServices from "../../services/postServices";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [quantityList, setQuantityList] = useState({});
  const navigate = useNavigate();
  const fetchPost = async () => {
    setPosts(await postServices.getPost());
  };

  useEffect(() => {
    fetchPost();
  }, [posts]);

  const handleBuyClick = (title) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find((item) => item.title === title);
    alert("Thêm vào giỏ hàng thành công, vui lòng kiểm tra giỏ hàng ở cuối trang");
    if (existingItem) {
      // If it exists, update the quantity
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + parseInt(quantityList[title] || 1) } : item
        )
      );
     
    } else {
      // If it doesn't exist, add it to the cart with the quantity
      setCartItems([...cartItems, { title: title, quantity: parseInt(quantityList[title] || 1) }]);
    }
  };



const handleBuyCartClick = async () => {
  try {
    // Gọi API để lưu thông tin giỏ hàng vào CSDL
    const saveToDatabaseResponse = await postServices.saveCartToDatabase({
      cartItems: cartItems,
    });

    if (saveToDatabaseResponse.data.success) {
      console.log(saveToDatabaseResponse.data.msg);
      console.log("Thông tin giỏ hàng:", cartItems);

    } else {
      console.error("Lưu thông tin giỏ hàng vào CSDL không thành công:", saveToDatabaseResponse.data.msg);

    }
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
};




  return (
    <div>
      <h1>Home</h1>
      <div>
        <div className="d-flex justify-content-center">
          <div className="row row-cols-1 row-cols-md-3">
            {posts.data !== undefined &&
              posts.data.data.length > 0 &&
              posts.data.data.map((post, index) => {
                return (
                  <div key={index} className="col mb-3">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`http://127.0.0.1:5000/api/postImages/${post.image}`}
                        alt=""
                        height={300}
                        width={300}
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                      <Card.Body className="d-flex flex-column justify-content-center">
                        <Card.Title style={{ textAlign: "center" }}>{post.title}</Card.Title>
                        <Card.Text style={{ textAlign: "center" }}>{post.date}</Card.Text>
                        <Button variant="primary" onClick={() => handleBuyClick(post.title)}>
                          Buy
                        </Button>
                        <label>Quantity:</label>
                        <input
                          type="number"
                          value={quantityList[post.title] || 1}
                          onChange={(e) => setQuantityList({ ...quantityList, [post.title]: e.target.value })}
                        />
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="Cart">
          <h3>Cart</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={handleBuyCartClick}>
            BuyCart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
