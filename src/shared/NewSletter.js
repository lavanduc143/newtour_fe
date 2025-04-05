import React from "react";
import "../styles/newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const NewSletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Để lại thông tin của bạn</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Nhập email" />
                <button className="btn newsletter__btn">Đăng kí</button>
              </div>

              <p>Đăng kí để nhận được những thông tin mới nhất từ chúng tôi</p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewSletter;
