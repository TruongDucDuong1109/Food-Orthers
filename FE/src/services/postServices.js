import axios from "axios";

class Post {
  create(formData) {
    const url = "http://localhost:5000/api/create-post";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }
  getPost() {
    const url = "http://localhost:5000/api/get-post";
    return axios.get(url);
  }

  deletePost(id) {
    const url = "http://localhost:5000/api/delete-post/" + id;
    return axios.get(url);
  }

  update(formData) {
    const url = "http://localhost:5000/api/update-post";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }

 

  addToCart(formData) {
    const url = "http://localhost:5000/api/cart/add";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }
  saveCartToDatabase(formData) {
    const url = "http://localhost:5000/api/cart/save";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }
  getCart() {
    const url = "http://localhost:5000/api/cart/getcart";
    return axios.get(url);
  }
  deleteCart (id) {
    const url = "http://localhost:5000/api/cart/delete-cart/" + id;
    return axios.get(url);
  }

  signUp(formData) {
    const url = "http://localhost:5000/api/auth/sign";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  }

  login() {
    const url = "http://localhost:5000/api/auth/login";
    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, config);
  }

   
}
const post = new Post();
export default  post;
