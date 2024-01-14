import React from "react";
import { useLocation } from "react-router-dom";

function AdminOrderPage() {
  const location = useLocation();
  const { cartItems, quantityList } = location.state || {};

  return (
    <div>
      <h1>Admin Order Page</h1>
      {/* Hiển thị thông tin đặt hàng tại đây */}
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - Quantity: {item.quantity} - Quantity selected: {quantityList[item.title]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrderPage;
