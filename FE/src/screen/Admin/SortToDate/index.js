import React, { useState, useEffect } from "react";
import postServices from "../../../services/postServices";

function QuantityByDay() {
  const [quantityByDay, setQuantityByDay] = useState({});

  const fetchQuantityByDay = async () => {
    try {
      const response = await postServices.getCart();
      const products = response.data.data || [];
  
      const groupedQuantity = products.reduce((acc, product) => {
        const date = product.items && product.items.length > 0
          ? new Date(product.items[0].date).toLocaleDateString("vi-VN")
          : null;
  
        const title = product.items && product.items.length > 0
          ? product.items[0].title
          : null;
  
        const quantity = product.items && product.items.length > 0
          ? product.items[0].quantity
          : 0;
  
        if (date && title) {
          if (!acc[date]) {
            acc[date] = {};
          }
  
          if (!acc[date][title]) {
            acc[date][title] = 0;
          }
  
          // Sum the quantity for each product on the same day
          acc[date][title] += quantity;
        }
  
        return acc;
      }, {});
  
      setQuantityByDay(groupedQuantity);
    } catch (error) {
      console.error("Error fetching quantity by day:", error);
      setQuantityByDay({});
    }
  };
  
  
  

  useEffect(() => {
    fetchQuantityByDay();
  }, []);

  return (
    <div>
      <h2>Quantity by Day</h2>
      <ul>
        {Object.keys(quantityByDay).map((day, index) => (
          <li key={index}>
            <h3>{day}</h3>
            <ul>
              {Object.keys(quantityByDay[day]).map((title, titleIndex) => (
                <li key={titleIndex}>
                  {title}: {quantityByDay[day][title]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuantityByDay;
