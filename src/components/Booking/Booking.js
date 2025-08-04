import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title, maxGroupSize } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourId: tour._id,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
    totalPrice: price,
  });

  const handleChange = (e) => {
    // setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const { id, value } = e.target;

    if (id === "guestSize") {
      if (value >= 1 || value === "") {
        const updatedGuestSize = value || 1; // Default to 1 if empty
        const calculatedTotalAmount =
          Number(price) * Number(updatedGuestSize) +
          Number(serviceFree) * Number(updatedGuestSize);

        setBooking((prev) => ({
          ...prev,
          [id]: updatedGuestSize,
          totalPrice: calculatedTotalAmount, // Update totalPrice
        }));
      }
    } else if (id === "phone") {
      const phonePattern = /^0\d{9}$/;
      if (phonePattern.test(value) || value === "") {
        setBooking((prev) => ({ ...prev, [id]: value }));
      }
    } else {
      setBooking((prev) => ({ ...prev, [id]: value }));
    }
  };

  const serviceFree = 100000;
  const totalAmount =
    Number(price) * Number(booking.guestSize) +
    Number(serviceFree) * Number(booking.guestSize);

  // send data to the server
  const handleClick = async (e) => {
    e.preventDefault();
    // Kiểm tra nếu guestSize không phải là số nguyên dương
    if (
      !Number.isInteger(Number(booking.guestSize)) ||
      booking.guestSize <= 0
    ) {
      toast.error("Có lỗi xảy ra");
      return;
      //alert("Guest size must be a positive integer.");
    }

    // Kiểm tra nếu guestSize trống (empty)
    if (!booking.guestSize) {
      toast.error("Vui lòng nhập số hành khách");
      return;
      //alert("Please enter the number of guests.");
    }

    // Kiểm tra nếu guestSize lớn hơn maxGroupSize
    if (booking.guestSize > maxGroupSize) {
      toast.error(`Số lượng khách không được lớn hơn ${maxGroupSize}`);
      return;
      //alert(`Guest size cannot exceed the maximum group size of ${maxGroupSize}.`);
    }

    // Lấy ngày hiện tại
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 0 để so sánh chỉ tính ngày

    // Lấy ngày người dùng chọn
    const selectedDate = new Date(booking.bookAt);

    if (selectedDate < today) {
      toast.error("Ngày đặt phòng phải từ ngày hôm nay");
      return;
      //alert("Booking date must be today or later.");
    }

    try {
      // Kiểm tra xem user đã đăng nhập hay chưa
      if (!user) {
        toast.error("Đăng nhập để tiếp tục");
        return;
        //alert("Please sign in to book the tour");
      }

      // Gửi yêu cầu tạo booking
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Bao gồm cookie nếu có
        body: JSON.stringify(booking),
      });

      // Kiểm tra trạng thái phản hồi
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Có lỗi xảy ra");
        return;
        //alert(errorData.message || "Failed to create booking.");
      }

      // Lấy dữ liệu từ phản hồi
      const result = await res.json();

      if (result.success && result.paymentUrl) {
        // Chuyển hướng tới URL thanh toán
        window.location.href = result.paymentUrl;
      } else {
        console.error("Payment URL not found:", result.message);
        toast.error("Không thể xử lí thanh toán");
        //alert(result.message || "Unable to process payment.");
      }
    } catch (err) {
      console.error("Error during booking:", err.message);
      toast.error("Có lỗi xảy ra");
      //alert("An error occurred while booking the tour. Please try again.");
    }
  };

  const formattedPrice = price ? price.toLocaleString("vi-VN") : "0";
  const formattedserviceFree = serviceFree
    ? serviceFree.toLocaleString("vi-VN")
    : "0";
  const formattedtotalAmount = totalAmount
    ? totalAmount.toLocaleString("vi-VN")
    : "0";

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h4>
          {formattedPrice} VND <span>/người</span>
        </h4>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Thông tin</h5>

        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Họ tên"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Số điện thoại"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="1"
              id="guestSize"
              required
              min="1"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__button">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {/* {formattedPrice} VND <i class="ri-close-line"></i> 1 person */}
              {price} <i class="ri-close-line"></i> 1 người
            </h5>
            <span> {formattedPrice} VND</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              Phí <i class="ri-close-line"></i> 1 người
            </h5>
            <span> {formattedserviceFree} VND</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Tổng tiền</h5>
            <span> {formattedtotalAmount} VND</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-0" onClick={handleClick}>
          Đặt Tour
        </Button>
      </div>
    </div>
  );
};

export default Booking;
