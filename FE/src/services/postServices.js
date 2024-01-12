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
}

export default new Post();