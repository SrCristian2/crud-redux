import { useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CardPost } from "./components/CardPost";
import { handleClose, handleShow } from "./redux/modalPostSlice";
import { addPost, putPost } from "./redux/postSlice";

const initialState = {
  img: "",
  title: "",
  description: "",
};

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postStore);

  const { show } = useSelector((state) => state.modalPostStore);

  const [formulario, setFormulario] = useState(initialState);

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isEdit ? dispatch(putPost(formulario)) : dispatch(addPost(formulario));
    dispatch(handleClose());
    restoreInitialState();
  };

  const restoreInitialState = () => {
    setFormulario(initialState);
    setIsEdit(false);
  };

  const clickUpdate = (post) => {
    setIsEdit(true);
    dispatch(handleShow());
    setFormulario(post);
  };

  return (
    <div className="container mt-3">
      <div className="text-center mb-4">
        <Button variant="primary" onClick={() => dispatch(handleShow())}>
          ADD
        </Button>
      </div>

      <Row>
        {posts.map((post) => (
          <CardPost
            key={post.id}
            dispatch={dispatch}
            post={post}
            clickUpdate={clickUpdate}
          ></CardPost>
        ))}
      </Row>

      {/* MODAL */}

      <Modal
        show={show}
        onHide={() => {
          dispatch(handleClose()), restoreInitialState();
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Hola</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Img Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter img url"
                name="img"
                value={formulario.img}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter title"
                name="title"
                value={formulario.title}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={formulario.description}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEdit ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(handleClose()), restoreInitialState();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
