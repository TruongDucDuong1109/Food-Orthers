// import React, { useState, useEffect } from "react";
// import postServices from "../../services/postServices";
// import { Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Showcart.css';

// function ShowCart() {
//   const [posts, setPosts] = useState([]);

//   const fetchPost = async () => {
//     try {
//       const response = await postServices.getCart();
//       setPosts(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setPosts([]);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, []);

//   return (
//     <div>
//       <h1>ShowCart</h1>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Family</th>
//             <th>Title</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post, index) => (
//             <React.Fragment key={index}>
              
//                 {post.items.map((item, itemIndex) => (
//                   <tr key={itemIndex}>
//                     {itemIndex === 0 && (
//                       <React.Fragment>
//                         <td rowSpan={post.items.length} class="p-3 mb-2 bg-secondary text-white">{post.fullName}</td>
//                         <td rowSpan={post.items.length} class="p-3 mb-2 bg-secondary text-white">{post.family}</td>
//                       </React.Fragment>
//                     )}
//                     <td class="p-3 mb-2 bg-secondary text-white">{item.title}</td>
//                     <td class="p-3 mb-2 bg-secondary text-white">{item.quantity}</td>
//                   </tr>
//                 ))}
              
//             </React.Fragment>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default ShowCart;


import React, { useState, useEffect } from "react";
import postServices from "../../services/postServices";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Showcart.css';

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

      <div className="header">
        <div className="header-item">TÊN NGƯỜI ĐẶT</div>
        <div className="header-item">TỔ</div>
        <div className="header-item">SẢN PHẨM VÀ SỐ LƯỢNG</div>
       
      </div>

      {posts.map((post, index) => (
        <div key={index} className="cart-item">
          <div className="item">{post.fullName}</div>
          <div className="item">{post.family}</div>
          <div className="item items-container">
            {post.items.map((item, itemIndex) => (
              <div key={itemIndex} className="item-row">
                <div className="item">{item.title}</div>
                <div className="item">{item.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowCart;

