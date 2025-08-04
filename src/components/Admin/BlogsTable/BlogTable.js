import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { BASE_URL } from "../../../utils/config";
import useFetch from "../../../hooks/useFetch";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const BlogsTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    data: blog,
    loading,
    error,
  } = useFetch(`${BASE_URL}/blogs`, refreshKey);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    image: null,
    description: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [originalBlog, setOriginalBlog] = useState(null);
  const openEditModal = (blog) => {
    setOriginalBlog(blog); // Lưu bản sao dữ liệu gốc
    setEditingBlog(blog); // Lưu thông tin người dùng vào state
    setEditModal(true); // Mở modal
  };

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddBlog = async () => {
    const formData = new FormData();
    for (const key in newBlog) {
      formData.append(key, newBlog[key]);
    }

    try {
      const responseAdd = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
        credentials: "include",
      });

      if (responseAdd.ok) {
        toast.success("Thêm blog thành công");
      }

      if (!responseAdd.ok) {
        throw new Error("Failed to add blog");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setNewBlog({
        title: "",
        image: null,
        description: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleImageChange = async (e, setBlogState) => {
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
          setBlogState((prev) => ({
            ...prev,
            image: data.secure_url, // Add the new photo URL to the state
          }));
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } finally {
        setIsUploading(false); // Kết thúc quá trình tải ảnh lên
      }
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const confirmDelete = window.confirm("Bạn có chắn chắn muốn xoá?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isDelete: true }),
      });
      toast.success("Xoá blog thành công");
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditBlog = async () => {
    try {
      const updatedFields = {};
      // Check for changes in the user fields
      Object.keys(editingBlog).forEach((key) => {
        if (editingBlog[key] !== originalBlog[key]) {
          updatedFields[key] = editingBlog[key];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        //alert("No changes made.");
        toast.error("No changes made.");
        return;
      }

      const response = await fetch(`${BASE_URL}/blogs/${editingBlog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
        credentials: "include",
      });
      toast.success("Cập nhật blog thành công");
      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      setRefreshKey((prevKey) => prevKey + 1);
      setEditModal(false); // Close modal after update
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const truncateText = (text) => {
    return text.length > 25 ? text.slice(0, 25) + "..." : text;
  };

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortBlogs = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    if (blog) {
      blog.sort((a, b) => {
        const valueA = a[key]?.toString().toLowerCase() || ""; // Chuyển về chuỗi thường
        const valueB = b[key]?.toString().toLowerCase() || ""; // Chuyển về chuỗi thường

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
  const filteredBlogs = blog?.filter((blog) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.description.toLowerCase().includes(searchTerm)
    );
  });

  //phân trang
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredBlogs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredBlogs.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="d-flex gap-3 mb-3">
        {/* Search Bar */}
        <TextField
          label="Tìm theo tiêu đề"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={toggleModal}>
          Thêm Blog
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table striped style={{ minWidth: "800px" }}>
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
                onClick={() => sortBlogs("title")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Tiêu đề {renderSortIcon("title")}
              </TableCell>
              <TableCell
                onClick={() => sortBlogs("description")}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  paddingRight: 1,
                  "&:hover": { color: "primary.main" },
                  whiteSpace: "nowrap", // Prevent wrapping
                }}
              >
                Nội dung {renderSortIcon("description")}
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
            {currentItems?.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <img
                    src={blog.image}
                    alt="Blog"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </TableCell>
                <TableCell>{blog._id}</TableCell>
                <TableCell>{truncateText(blog.title)}</TableCell>
                <TableCell>{truncateText(blog.description)}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => openEditModal(blog)}
                    style={{ marginRight: "10px" }}
                  >
                    Sửa Blog
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    Xoá Blog
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddBlogModal
        isOpen={modal}
        toggle={toggleModal}
        newBlog={newBlog}
        handleInputChange={handleInputChange}
        handleAddBlog={handleAddBlog}
        handleImageChange={handleImageChange}
        setNewBlog={setNewBlog}
      />
      <EditBlogModal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        editingBlog={editingBlog}
        setEditingBlog={setEditingBlog}
        handleEditBlog={handleEditBlog}
        handleImageChange={handleImageChange}
      />

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
    </div>
  );
};

export default BlogsTable;
