import React, { useRef } from "react";
import "../SearchTour/search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchBlog = () => {
  const titleRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    // Lấy giá trị từ các trường input
    const title = titleRef.current.value;

    // Kiểm tra nếu không có bất kỳ giá trị nào
    if (!title) {
      toast.error("Nhập từ khoá để tìm kiếm");
      return;
      //alert("Please enter at least one search criteria.");
    }

    // Xây dựng URL động dựa trên các giá trị có sẵn
    const queryParams = new URLSearchParams();
    if (title) queryParams.append("title", title);

    const res = await fetch(
      `${BASE_URL}/blogs/search/getBlogBySearch?${queryParams.toString()}`
    );

    if (!res.ok) {
      //alert("Something went wrong");
      toast.error("Có lỗi xảy ra");
      return;
    }

    const result = await res.json();

    navigate(`/blogs/search?${queryParams.toString()}`, { state: result.data });
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Tiêu đề</h6>
              <input
                type="text"
                placeholder="Nhập tên bài viết"
                ref={titleRef}
              />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBlog;
