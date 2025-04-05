import React from "react";
import "../styles/homepage.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../components/SearchTour/SearchBar";
import ServiceList from "../services/ServiceList";
import ForeignTours from "../components/Foreign-tours/Foreign.Tours";
import DomesticTours from "../components/Domestic-tours/Domestic.Tours";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import NewSletter from "../shared/NewSletter";
import ScrollButton from "../shared/ScrollButton";

const HomePage = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Chuẩn bị trước chuyến đi"} />
                  <img src={worldImg} alt="" />
                </div>

                <h1>
                  Cùng bạn chinh phục những hành trình
                  <span className="highlight"> mơ ước</span>
                </h1>
                <p>
                  Với hàng loạt tour chất lượng, lịch trình linh hoạt và giá cả
                  hợp lý, chúng tôi giúp bạn dễ dàng lên kế hoạch và tận hưởng
                  kỳ nghỉ trọn vẹn. Đặt tour ngay hôm nay để bắt đầu hành trình
                  đầy ấn tượng!
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls autoPlay loop muted />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </div>

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">Về chúng tôi</h5>
              <h2 className="services__title">
                Chúng tôi cung cấp những dịch vụ tốt nhất
              </h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* Our foreign tours */}
      <div>
        <Container>
          <Row>
            <Col lg="12" className="mb-4">
              <Subtitle subtitle={"Khám phá"} />
              <h2 className="featured__tour-title">Các tour nổi bật</h2>
            </Col>
            <ForeignTours />
          </Row>
        </Container>
      </div>

      {/* Our domestic tours */}
      {/* <div>
        <Container>
          <Row>
            <Col lg="12" className="mb-3">
              <Subtitle subtitle={"Khám phá"} />
              <h2 className="featured__tour-title">Các tour trong nước</h2>
            </Col>
            <DomesticTours />
          </Row>
        </Container>
      </div> */}

      <div className="mt-4">
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Kinh nghiệm"} />
                <h2>
                  Với tất cả kinh nghiệm của chúng tôi, chúng tôi sẽ phục vụ bạn
                </h2>
                <p>
                  Chúng tôi mang đến những trải nghiệm tuyệt vời nhất, <br />{" "}
                  cam kết dịch vụ chất lượng và tận tâm.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>100+</span>
                  <h6>Chuyến đi thành công</h6>
                </div>
                <div className="counter__box">
                  <span>10+</span>
                  <h6>Khách hàng thân thiết</h6>
                </div>
                <div className="counter__box">
                  <span>1</span>
                  <h6>Năm kinh nghiệm</h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="lala" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Images */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Chia sẻ"} />
              <h2 className="gallery__title">Hình ảnh từ khách hàng</h2>
            </Col>

            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <div>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">Đánh giá của khách hàng</h2>
            </Col>

            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </div>
      <ScrollButton />

      <NewSletter />
    </>
  );
};

export default HomePage;
