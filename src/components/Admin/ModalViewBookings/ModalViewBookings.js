import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import axios from "axios";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingListModal = ({ open, onClose, tourId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // state để lưu ngày đã chọn

  useEffect(() => {
    const fetchBookings = async () => {
      if (open && tourId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${BASE_URL}/bookings/byTour/${tourId}`
          );
          setBookings(response.data.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [open, tourId]);

  const totalGuest = bookings.reduce((sum, b) => sum + b.guestSize, 0);
  const totalPrice = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  // Hàm lọc bookings theo ngày
  const filteredBookings = selectedDate
    ? bookings.filter(
        (booking) =>
          new Date(booking.bookAt).toLocaleDateString("vi-VN") ===
          selectedDate.toLocaleDateString("vi-VN")
      )
    : bookings;

  const handleExportExcel = () => {
    const exportData = filteredBookings.map((booking) => ({
      "Họ tên": booking.fullName,
      Email: booking.userEmail,
      "Số điện thoại": booking.phone,
      "Ngày đặt": new Date(booking.bookAt).toLocaleDateString("vi-VN"),
      "Số người": booking.guestSize,
      "Tổng tiền (VNĐ)": booking.totalPrice,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách đặt tour");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `Danh_sach_dat_tour_${tourId}.xlsx`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Danh sách người đã đặt tour</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : bookings.length === 0 ? (
          <Typography>Chưa có người đặt tour này.</Typography>
        ) : (
          <>
            {/* DatePicker để chọn ngày */}
            <div style={{ marginBottom: "20px" }}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Chọn ngày"
                dateFormat="dd/MM/yyyy"
                isClearable
              />
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>SĐT</TableCell>
                  <TableCell>Ngày đi</TableCell>
                  <TableCell align="right">Số người</TableCell>
                  <TableCell align="right">Tổng tiền (VNĐ)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.fullName}</TableCell>
                    <TableCell>{booking.userEmail}</TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>
                      {new Date(booking.bookAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell align="right">{booking.guestSize}</TableCell>
                    <TableCell align="right">
                      {booking.totalPrice.toLocaleString("vi-VN")} ₫
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <strong>Tổng cộng:</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{totalGuest}</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{totalPrice.toLocaleString("vi-VN")} ₫</strong>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleExportExcel} color="success" variant="outlined">
          Xuất Excel
        </Button>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingListModal;
