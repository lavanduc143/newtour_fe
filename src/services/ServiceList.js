import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: `Theo dõi thời tiết`,
    desc: `Cập nhật thời tiết chính xác giúp bạn chủ động lịch trình.`,
  },
  {
    imgUrl: guideImg,
    title: `Hướng dẫn viên du lịch`,
    desc: `Hướng dẫn viên chuyên nghiệp, am hiểu địa phương.`,
  },
  {
    imgUrl: customizationImg,
    title: `Lịch trình linh hoạt`,
    desc: `Tùy chỉnh chuyến đi theo sở thích và thời gian của bạn.`,
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
