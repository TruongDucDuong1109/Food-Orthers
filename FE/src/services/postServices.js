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
  getPost(){
    const url = "http://localhost:5000/api/get-post";
    return axios.get(url);
  }

  deletePost(id) {
    const url = "http://localhost:5000/api/delete-post/"+id;
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
}

export default new Post();