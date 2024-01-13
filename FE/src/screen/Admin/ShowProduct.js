import { useState, useEffect } from "react";
import postServices from "../../services/postServices";
import UpdateModal from "../Admin/UpdateModal";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
      <h1>ShowProduct</h1>
      {
        posts.data !== undefined && posts.data.data.length > 0 && (
          <table style = {{width: '100%'}} border = '1'>
            <thead>
              <th>Title</th>
              <th>Data</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Edit</th>
            </thead>
            <tbody>
              {
                posts.data.data.map((posts, index) => {
                  return (
                    <tr key={index}>
                      <td>{posts.title}</td>
                      <td>{posts.date}</td>
                      <td><img src={'http://127.0.0.1:5000/api/postImages/'+posts.image} alt="" width={50} height={50}/></td>
                      <td><button id = {posts._id} onClick={(e) => deletePost(posts._id,e)}>Delete</button></td>
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