import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/success.css";
import successImg from "../assets/images/register.png";
const RegistrationSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col lg="12" className="m-auto text-center">
          <div className="success__container">
            <div className="success__img">
              <img src={successImg} alt="Success" />
            </div>
            <h2>Đăng kí thành công</h2>
            <p>Xác nhận email thành công, đăng nhập ngay</p>
            <Button
              className="btn secondary__btn auth__btn"
              onClick={() => navigate("/login")}
            >
              Quay lại
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default RegistrationSuccess;
