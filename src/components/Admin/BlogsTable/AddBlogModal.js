import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const AddBlogModal = ({
  isOpen,
  toggle,
  newBlog,
  handleInputChange,
  handleAddBlog,
  handleImageChange,
  setNewBlog,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm bài viết mới</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Tiêu đề</Label>
            <Input
              type="text"
              name="title"
              id="title"
              //   value={newPost.title}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Ảnh</Label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              //   value={newPost.image}
              // onChange={handlePhotoChange}
              onChange={(e) => handleImageChange(e, setNewBlog)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Nội dung</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              //   value={newPost.description}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddBlog}>
          Lưu
        </Button>
        <Button color="secondary" onClick={toggle}>
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddBlogModal;
