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
      <ModalHeader toggle={toggle}>Edit Booking</ModalHeader>
      <ModalBody>
        {editingBooking && (
          <Form>
            <FormGroup>
              <Label for="fullName">Full Name</Label>
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
              <Label for="phone">Phone</Label>
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
              <Label for="bookAt">Booking Date</Label>
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
              <Label for="isPayment">Payment</Label>
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
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
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
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </Input>
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleEditBooking}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditBookingModal;
