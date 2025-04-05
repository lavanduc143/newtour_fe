import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo1.png";

const quick__links = [
  {
    path: "/homepage",
    display: "Trang chủ",
  },
  {
    path: "/blogs",
    display: "Blogs",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/about",
    display: "Về chúng tôi",
  },
  {
    path: "/login",
    display: "Đăng nhập",
  },
  {
    path: "/register",
    display: "Đăng kí",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img
                src={logo}
                alt=""
                className="d-flex justify-content-center"
              />
              <p>Hành trình tuyệt vời-Trải nghiệm trọn vẹn</p>

              <div className="social__links d-flex align-items-center gap-4 justify-content-center">
                <span>
                  <Link to="#">
                    <i class="ri-youtube-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="#">
                    <i class="ri-github-fill"></i>
                  </Link>
                </span>

                <span>
                  <Link to="#">
                    <i class="ri-facebook-circle-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="#">
                    <i class="ri-instagram-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Khám phá</h5>

            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Thông tin</h5>

            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Liên hệ</h5>

            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line"></i>
                  </span>
                  Địa chỉ:
                </h6>
                <p className="mb-0">Hà Nội, Việt Nam</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-send-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">lavanduc143@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-line"></i>
                  </span>
                  Điện thoại:
                </h6>
                <p className="mb-0">0901780640</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              <i class="ri-copyright-line"></i> Copyright {year}. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
