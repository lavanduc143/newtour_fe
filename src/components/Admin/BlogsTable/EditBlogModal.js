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

const EditBlogModal = ({
  isOpen,
  toggle,
  editingBlog,
  setEditingBlog,
  handleEditBlog,
  handleImageChange,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sửa Blog</ModalHeader>
      <ModalBody>
        {editingBlog && (
          <Form>
            <FormGroup>
              <Label for="title">Tiêu đề</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={editingBlog?.title}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Ảnh</Label>
              <Input
                type="file"
                name="image"
                id="image"
                // onChange={handlePhotoChange}
                onChange={(e) => handleImageChange(e, setEditingBlog)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Nội dung</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={editingBlog?.description}
                onChange={(e) =>
                  setEditingBlog({
                    ...editingBlog,
                    description: e.target.value,
                  })
                }
              />
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditBlog}>
          Lưu
        </Button>
        <Button color="secondary" onClick={toggle}>
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditBlogModal;
