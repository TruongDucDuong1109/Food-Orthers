import { useState, useEffect } from "react";
import postServices from "../../../services/postServices";
import UpdateModal from "../UpdateModal"
import {Link} from 'react-router-dom';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./showproduct.css";
function ShowProduct () {
  
  const [posts, setPosts] = useState({});
  
  const fetchPost = async () => {
    setPosts(await postServices.getPost());
  }

  useEffect(() => {
    fetchPost();
  }, [posts]);

  const deletePost = async (id,e) => {
    const postElement = document.getElementById(id);

    if (postElement && postElement.parentElement && postElement.parentElement.parentElement) {
        var response = await postServices.deletePost(id);
        if (response.data.success === true) {
            postElement.parentElement.parentElement.remove();
            alert(response.data.msg);
        } else {
            alert('Delete failed');
        }
    } else {
        alert('Post element not found in the DOM');
    }
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
 
      <Link class="navbar-brand bg-success p-2 rounded text-white" to="/home" >Sản phẩm</Link>
      <Link class="navbar-brand bg-success p-2 rounded text-white" to="/showcart" >Giỏ hàng</Link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
      {
        posts.data !== undefined && posts.data.data.length > 0 && (
          <table style = {{width: '100%'}} border = '1' className="table table-hover">
            <thead className="">
              <th>Tên</th>
              <th>Ngày</th>
              <th>Hình ảnh</th>
              <th>Xóa</th>
              <th>Chỉnh sửa</th>
            </thead>
            <tbody>
              {
                posts.data.data.map((posts, index) => {
                  return (
                    <tr key={index} className="table-form ">
                      <td>{posts.title}</td>
                      <td>{posts.date}</td>
                      <td><img src={'http://127.0.0.1:5000/api/postImages/'+posts.image} alt="" width={80} height={80}/></td>
                      <td><button id = {posts._id} onClick={(e) => deletePost(posts._id,e)} className="btn-del">Xóa</button></td>
                      <td><UpdateModal id = {posts._id} title={posts.title} date={posts.date}/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default ShowProduct;