import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/thank-you.css";

const ThankYou = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i class="ri-checkbox-circle-line"></i>
              </span>

              <h1 className="mb-3 fw-semibold">Cảm ơn bạn</h1>

              {/* <h3 className="mb-4">Your tour is booked</h3> */}

              <Link to="/homepage" className="btn primary__btn w-25">
                {/* <Link to="/homepage"></Link> */}
                Quay lại
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
