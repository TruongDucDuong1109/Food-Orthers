import React, { useState, useEffect } from "react";
import postServices from "../../services/postServices";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [quantityList, setQuantityList] = useState({});
  const [fullName, setFullName] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [family, setFamily] = useState("");

  // Lấy danh sách sản phẩm
  const fetchPost = async () => {
    setPosts(await postServices.getPost());
  };

  useEffect(() => {
    fetchPost();
  }, [posts]);

  // Thêm sản phẩm vào giỏ hàng
  const handleBuyClick = (title) => {
    if (!selectedDay) {
      alert("Vui lòng chọn ngày trước khi mua sản phẩm!");
      return;
    }
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
      const newItem = {
        title: title,
        quantity: parseInt(quantityList[title] || 1),
        date: selectedDay,
      };
      setCartItems([...cartItems, newItem]);
    }
  };
  // Thanh toán giỏ hàng
  const handleBuyCartClick = async () => {
    try {
      // Gọi API để lưu thông tin giỏ hàng vào CSDL
      const saveToDatabaseResponse = await postServices.saveCartToDatabase({
        cartItems: cartItems,
        fullName: fullName,
        family: family,
      });

      if (saveToDatabaseResponse.data.success) {
        alert("Thanh toán thành công");
        window.location.reload();
        console.log(saveToDatabaseResponse.data.msg);
        console.log("Thông tin giỏ hàng:", cartItems);
      } else {
        console.error("Lưu thông tin giỏ hàng vào CSDL không thành công:", saveToDatabaseResponse.data.msg);
      }
    } catch (error) {
      console.error("Lỗi:", error.message);
    }
  };

  // Thay đổi số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (index, newQuantity) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      updatedCartItems[index].quantity = parseInt(newQuantity);
      return updatedCartItems;
    });
  };

  //format lại ngày thành thứ
  const formatDateToDay = (dateString) => {
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  // Xóa sản phẩm trong giỏ hàng
  const handleDeleteClick = (index) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      updatedCartItems.splice(index, 1);
      return updatedCartItems;
    });
  };

  // Sắp xếp sản phẩm theo ngày
  const sortedCartItems = cartItems.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h1 className="TextHeader">Đặt Hàng</h1>
      <div>
        <div className="d-flex flex-row ">
          <label htmlFor="day" className="daytitle">
            Vui lòng chọn ngày
          </label>
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="select-day"
          />
        </div>
        <div className="d-flex justify-content-center container ">
          <div className="row row-cols-1 row-cols-md-3 ">
            {posts.data !== undefined &&
              posts.data.data.length > 0 &&
              posts.data.data
                .filter((post) => !selectedDay || post.date === selectedDay)
                .map((post, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <Card className="m-4 p-3 custom-card ">
                          <Card.Img
                            variant="top"
                            src={`http://127.0.0.1:5000/api/postImages/${post.image}`}
                            alt=""
                            height={300}
                            width={300}
                            style={{ objectFit: "cover" }}
                            className="img-card"
                          />
                          <Card.Body className="d-flex flex-column justify-content-center conti">
                            <Card.Title className="TitleCard">{post.title}</Card.Title>
                            {/* <Card.Text style={{ textAlign: "center" }}>{post.date}</Card.Text> */}
                            <div className="d-flex align-items-center">
                              <div className="mr-auto p-2">
                                <Button
                                  variant="primary"
                                  onClick={() => handleBuyClick(post.title)}
                                  className="btn-buy"
                                >
                                  Mua
                                </Button>
                              </div>

                              <div className="p-2">
                                <h7>Sl:</h7>
                              </div>
                              <div className="p-2">
                                <input
                                  type="number"
                                  value={quantityList[post.title] || 1}
                                  onChange={(e) => setQuantityList({ ...quantityList, [post.title]: e.target.value })}
                                  className="p-2  input-qtt"
                                />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="Cart">
          <h1 className="TextHeader">Giỏ hàng</h1>
          <div>
            <ul>
              {sortedCartItems.map((item, index) => (
                <li key={index} className="d-flex justify-content-center">
                  <div className="containerCart">
                    <h7 className="titlecart">{item.title}</h7>
                    <h7 className="titlecart">Ngày: {formatDateToDay(item.date)}</h7>
                    <h7>Số lượng:</h7>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="p-2  input-qtt"
                    />{" "}
                    <Button variant="danger" onClick={() => handleDeleteClick(index)}>
                      Xóa
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              placeholder="Họ và Tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-info"
            />
            <input
              type="text"
              placeholder="Tổ"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className="input-info"
            />
          </div>
          <div className="d-flex justify-content-center m-5">
            <button onClick={handleBuyCartClick} className="btn-payment">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
