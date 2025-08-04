import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddTourModal from "./AddTourModal";
import EditTourModal from "./EditTourModal";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import BookingListModal from "../ModalViewBookings/ModalViewBookings";

const ToursTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newTour, setNewTour] = useState({
    title: "",
    city: "",
    address: "",
    day: "",
    photo: null,
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const [editModal, setEditModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [originalTour, setOriginalTour] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);

  const handleOpenViewModal = (tourId) => {
    setSelectedTourId(tourId);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedTourId(null);
  };

  const openEditModal = (tour) => {
    setOriginalTour(tour); // Lưu bản sao dữ liệu gốc
    setEditingTour(tour); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTour((prev) => ({
      ...prev,
      [name]: name === "featured" ? value === "true" : value, // Chuyển đổi sang Boolean nếu là featured
    }));
  };

  const handleAddTour = async () => {
    // Validate fields
    const { day, price, maxGroupSize } = newTour;
    const errors = [];
    if (day < 1) errors.push("Ngày phải lớn hơn hoặc bằng 1.");
    if (price < 1) errors.push("Giá phải lớn hơn hoặc bằng 1.");
    if (maxGroupSize < 1) errors.push("Số người phải lớn hơn hoặc bằng 1");
    if (errors.length > 0) {
      //alert(errors.join("\n")); // Hiển thị tất cả các lỗi, mỗi lỗi trên một dòng.
      toast.error(errors.join("\n"));
      return;
    }

    const formData = new FormData();
    for (const key in newTour) {
      formData.append(key, newTour[key]);
    }

    try {
      const responseAdd = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
        credentials: "include",
      });

      if (!responseAdd.ok) {
        // throw new Error("Failed to add tour");
        const errorData = await responseAdd.json();
        throw new Error(errorData.message || "Failed to add tour");
      }
      toast.success("Thêm tour mới thành công");
      setRefreshKey((prevKey) => prevKey + 1);
      setNewTour({
        title: "",
        city: "",
        address: "",
        day: "",
        photo: null,
        desc: "",
        price: "",
        maxGroupSize: "",
        featured: false,
      });
      toggleModal();
    } catch (error) {
      // console.error("Error adding tour:", error);
      //alert(error.message);
      toast.error(error.message);
    }
  };

  const handlePhotoChange = async (e, setTourState) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Bắt đầu tải ảnh lên
      // Tạo FormData để gửi ảnh lên Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tourImg"); // Đảm bảo cấu hình trên Cloudinary cho phép tải lên không xác thực

      try {
        // Gửi ảnh lên Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dyz76qvjr/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          setTourState((prev) => ({
            ...prev,
            photo: data.secure_url, // Add the new photo URL to the state
          }));
        }
      } catch (error) {
        console.error("Error uploading photo to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Kết thúc quá trình tải ảnh lên
      }
    }
  };

  const handleDeleteTour = async (tourId) => {
    const confirmDelete = window.confirm("Bạn có chắn chắn muốn xoá?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isDelete: true }),
      });
      toast.success("Xoá tour thành công");
      if (!response.ok) {
        throw new Error("Failed to delete tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleEditTour = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingTour).forEach((key) => {
        if (editingTour[key] !== originalTour[key]) {
          updatedFields[key] = editingTour[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        //alert("No changes made.");
        toast.error("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/tours/${editingTour._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });
      toast.success("Cập nhật tour thành công");
      if (!response.ok) {
        throw new Error("Failed to update tour");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 15 ? text.slice(0, 15) + "..." : text;
  };

  const formatCurrency = (price) => {
    return Number(price).toLocaleString("vi-VN") + " VND";
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortTours = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (tour) {
      tour.sort((a, b) => {
        // Kiểm tra nếu key là các trường số
        if (["day", "price", "maxGroupSize"].includes(key)) {
          const valueA = Number(a[key]) || 0; // Chuyển về số, mặc định là 0 nếu không phải số
          const valueB = Number(b[key]) || 0;
          return direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        // Sắp xếp chuỗi cho các trường khác
        const valueA = a[key]?.toString().toLowerCase() || "";
        const valueB = b[key]?.toString().toLowerCase() || "";
        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
  };

  const renderSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    return (
      <i
        className={`ri-arrow-up-down-line ${isActive ? "text-primary" : ""}`}
        style={{ marginLeft: "5px", fontSize: "1rem" }}
      ></i>
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  // Filter users based on search query
  const filteredTours = tour?.filter((tour) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      tour.title.toLowerCase().includes(searchTerm) ||
      tour.city.toLowerCase().includes(searchTerm) ||
      tour.address.toLowerCase().includes(searchTerm)
    );
  });

  //phân trang
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredTours.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredTours.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <Box display="flex" gap={3} mb={3}>
        <TextField
          label="Nhập địa điểm cần tìm"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={toggleModal}>
          Thêm tour
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Ảnh
              </TableCell>
              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                ID
              </TableCell>
              <TableCell
                onClick={() => sortTours("title")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Tên tour du lịch {renderSortIcon("title")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("city")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Thành phố {renderSortIcon("city")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("address")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Địa chi {renderSortIcon("address")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("day")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Số ngày {renderSortIcon("day")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("desc")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Mô tả {renderSortIcon("desc")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("price")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 10,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Giá {renderSortIcon("price")}
              </TableCell>
              <TableCell
                onClick={() => sortTours("maxGroupSize")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Số người tối đa {renderSortIcon("maxGroupSize")}
              </TableCell>
              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Tour nổi bật
              </TableCell>

              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentItems?.map((tour) => (
              <TableRow key={tour._id}>
                <TableCell>
                  <img
                    src={tour.photo}
                    alt="Tour"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{truncateText(tour._id)}</TableCell>
                <TableCell>{tour.title}</TableCell>
                <TableCell>{truncateText(tour.city)}</TableCell>
                <TableCell>{truncateText(tour.address)}</TableCell>
                <TableCell>{truncateText(tour.day)}</TableCell>
                <TableCell>{truncateText(tour.desc)}</TableCell>
                <TableCell>{formatCurrency(tour.price)}</TableCell>
                <TableCell>{truncateText(tour.maxGroupSize)}</TableCell>
                <TableCell>
                  {tour.featured ? (
                    <Typography color="green">Có</Typography>
                  ) : (
                    <Typography color="red">Không</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {tour.status === "available" ? (
                    <Typography color="green">Còn trống</Typography>
                  ) : (
                    <Typography color="red">Hết chỗ</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => openEditModal(tour)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteTour(tour._id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleOpenViewModal(tour._id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTourModal
        isOpen={modal}
        toggle={toggleModal}
        newTour={newTour}
        handleChange={handleChange}
        handleAddTour={handleAddTour}
        handlePhotoChange={handlePhotoChange}
        setNewTour={setNewTour}
      />
      <EditTourModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingTour={editingTour}
        setEditingTour={setEditingTour}
        handleEditTour={handleEditTour}
        handlePhotoChange={handlePhotoChange}
      />

      <BookingListModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        tourId={selectedTourId}
      />

      {/* Phân trang */}
      <ReactPaginate
        previousLabel="«"
        nextLabel="»"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center mt-4"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </Box>
  );
};

export default ToursTable;
