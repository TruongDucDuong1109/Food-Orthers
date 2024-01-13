import { useState, useEffect } from "react";
import postServices from "../../services/postServices";
// import UpdateModal from "../Admin/UpdateModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    setPosts(await postServices.getPost());
  };

  useEffect(() => {
    fetchPost();
  }, [posts]);

  return (
    <div>
      <h1>Home</h1>
      {posts.data !== undefined &&
        posts.data.data.length > 0 &&
        posts.data.data.map((posts, index) => {
          return (
            <div class="d-flex flex-column">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={'http://127.0.0.1:5000/api/postImages/'+posts.image} alt="" height={300} width={300}/>
                <Card.Body>
                  <Card.Title>{posts.title}</Card.Title>
                  <Card.Text>
                    {posts.date}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
