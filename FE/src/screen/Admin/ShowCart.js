import React, { useState, useEffect } from "react";
import postServices from "../../services/postServices";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowCart() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await postServices.getCart();
      setPosts(response.data.data || []);
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
      <h1>ShowCart</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              {post.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowCart;
