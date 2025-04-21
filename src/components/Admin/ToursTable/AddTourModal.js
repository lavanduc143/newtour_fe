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

const AddTourModal = ({
  isOpen,
  toggle,
  newTour,
  handleChange,
  handleAddTour,
  handlePhotoChange,
  setNewTour,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm tour mới</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Tên</Label>
            <Input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">Thành phố</Label>
            <Input type="text" name="city" id="city" onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ</Label>
            <Input
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="day">Số ngày</Label>
            <Input
              type="number"
              name="day"
              id="day"
              min="1"
              value={newTour?.day}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Ảnh</Label>
            <Input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              // onChange={handlePhotoChange}
              onChange={(e) => handlePhotoChange(e, setNewTour)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Mô tả</Label>
            <Input
              type="textarea"
              name="desc"
              id="desc"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Giá</Label>
            <Input
              type="number"
              name="price"
              id="price"
              min="1"
              value={newTour?.price}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Số người tối đa</Label>
            <Input
              type="number"
              name="maxGroupSize"
              id="maxGroupSize"
              min="1"
              value={newTour?.maxGroupSize}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="featured">Tour nổi bật</Label>
            <Input
              type="select"
              name="featured"
              id="featured"
              value={newTour?.featured} // Hiển thị giá trị hiện tại
              onChange={handleChange}
            >
              <option value={false}>Có</option>
              <option value={true}>Không</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleAddTour}>
          Lưu
        </Button>
        <Button color="secondary" onClick={toggle}>
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddTourModal;
