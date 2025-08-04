import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.png";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    // speed: 1000,
    speed: 3000,
    swipeToSlide: true,
    // autoplaySpeed: 2000,
    autoplaySpeed: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    {
      img: ava01,
      name: "Lã Đức",
      role: "Khách hàng",
      text: "Dịch vụ tuyệt vời! Chuyến đi được tổ chức chuyên nghiệp, hướng dẫn viên nhiệt tình và thân thiện.",
    },
    {
      img: ava02,
      name: "Hoà Minzy",
      role: "Khách hàng",
      text: "Trải nghiệm không thể tuyệt vời hơn! Mọi thứ đều được chuẩn bị kỹ lưỡng, lịch trình hợp lý.",
    },
    {
      img: ava03,
      name: "MTP",
      role: "Khách hàng",
      text: "Rất hài lòng với dịch vụ! Từ khâu đặt tour đến lúc trải nghiệm đều rất chuyên nghiệp và tận tâm.",
    },
  ];
  const doubleSlides = [...slides, ...slides]; // Nhân đôi danh sách slide

  return (
    <Slider {...settings}>
      {doubleSlides.map((slide, index) => (
        <div key={index} className="testimonial py-4 px-3">
          <p>{slide.text}</p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img
              src={slide.img}
              className="rounded-2"
              alt=""
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-0 mt-3">{slide.name}</h5>
              <p>{slide.role}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
