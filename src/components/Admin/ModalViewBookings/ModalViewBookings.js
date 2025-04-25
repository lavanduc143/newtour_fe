// components/BookingListModal.jsx
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

const BookingListModal = ({ open, onClose, tourId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleExportExcel = () => {
    const exportData = bookings.map((booking) => ({
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>SĐT</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell align="right">Số người</TableCell>
                <TableCell align="right">Tổng tiền (VNĐ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
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
