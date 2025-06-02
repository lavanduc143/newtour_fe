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

const EditTourModal = ({
  isOpen,
  toggle,
  editingTour,
  setEditingTour,
  handleEditTour,
  handlePhotoChange,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sửa Tour</ModalHeader>
      <ModalBody>
        {editingTour && (
          <Form>
            <FormGroup>
              <Label for="title">Tên</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={editingTour?.title}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, title: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">Thành phố</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={editingTour?.city}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, city: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Địa chỉ</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={editingTour?.address}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, address: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="day">Số ngày</Label>
              <Input
                type="number"
                name="day"
                id="day"
                min="1"
                value={editingTour?.day}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, day: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Ảnh</Label>
              <Input
                type="file"
                name="photo"
                id="photo"
                // onChange={handlePhotoChange}
                onChange={(e) => handlePhotoChange(e, setEditingTour)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Mô tả</Label>
              <Input
                type="textarea"
                name="desc"
                id="desc"
                value={editingTour?.desc}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, desc: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Giá</Label>
              <Input
                type="number"
                name="price"
                id="price"
                min="1"
                value={editingTour?.price}
                onChange={(e) =>
                  setEditingTour({ ...editingTour, price: e.target.value })
                }
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
                value={editingTour?.maxGroupSize}
                onChange={(e) =>
                  setEditingTour({
                    ...editingTour,
                    maxGroupSize: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="featured">Tour nổi bật</Label>
              <Input
                type="select"
                name="featured"
                id="featured"
                value={editingTour?.featured} // Hiển thị giá trị hiện tại
                onChange={(e) =>
                  setEditingTour({ ...editingTour, featured: e.target.value })
                }
              >
                <option value={false}>Không</option>
                <option value={true}>Có</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={editingTour?.status} // Hiển thị giá trị hiện tại
                onChange={(e) =>
                  setEditingTour({ ...editingTour, status: e.target.value })
                }
              >
                <option value={"available"}>Còn trống</option>
                <option value={"unavailable"}>Hết chỗ</option>
              </Input>
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditTour}>
          Lưu
        </Button>
        <Button color="secondary" onClick={toggle}>
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTourModal;
