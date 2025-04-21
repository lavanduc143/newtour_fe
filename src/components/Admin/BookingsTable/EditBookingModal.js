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

const EditBookingModal = ({
  isOpen,
  toggle,
  editingBooking,
  setEditingBooking,
  handleEditBooking,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Sửa đơn đặt</ModalHeader>
      <ModalBody>
        {editingBooking && (
          <Form>
            <FormGroup>
              <Label for="fullName">Tên người đặt</Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                value={editingBooking?.fullName}
                onChange={(e) =>
                  setEditingBooking({
                    ...editingBooking,
                    fullName: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Số điện thoại</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={editingBooking?.phone}
                onChange={(e) =>
                  setEditingBooking({
                    ...editingBooking,
                    phone: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="bookAt">Ngày đi</Label>
              <Input
                type="date"
                name="bookAt"
                id="bookAt"
                min={new Date().toISOString().split("T")[0]}
                value={editingBooking?.bookAt}
                onChange={(e) =>
                  setEditingBooking({
                    ...editingBooking,
                    bookAt: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="isPayment">Thanh toán</Label>
              <Input
                type="select"
                name="isPayment"
                id="isPayment"
                value={editingBooking?.isPayment}
                onChange={(e) =>
                  setEditingBooking({
                    ...editingBooking,
                    isPayment: e.target.value,
                  })
                }
              >
                <option value={true}>Đã thanh toán</option>
                <option value={false}>Chưa thanh toán</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="status">Trạng thái</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={editingBooking?.status}
                onChange={(e) =>
                  setEditingBooking({
                    ...editingBooking,
                    status: e.target.value,
                  })
                }
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="completed">Hoàn thành</option>
              </Input>
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditBooking}>
          Lưu
        </Button>
        <Button color="secondary" onClick={toggle}>
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditBookingModal;
