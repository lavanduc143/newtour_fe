import React, { useEffect } from "react";
import "./about.css";
import ScrollButton from "../../shared/ScrollButton";
import logo from "../../assets/images/logo1.png";
import { Container, Row, Col } from "reactstrap";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <section className="about mb-4 mt-3">
              <div className="section-header mb-4">
                <h2>Về chúng tôi</h2>
                <img src={logo} alt="" />
              </div>

              <div className="content">
                <div className="info">
                  <h4>1. Chúng tôi là LATRAVEL</h4>
                  <p>
                    LATRAVEL.com là sản phẩm chính thức của Công ty TNHH Du lịch
                    và Dịch vụ LATRAVEL.
                  </p>
                  <p>
                    Với niềm đam mê du lịch và khám phá, chúng tôi đã cùng nhau
                    xây dựng một website - nơi khách hàng có thể dễ dàng lựa
                    chọn những chuyến đi đáng nhớ cho bản thân và gia đình.
                    LATRAVEL cung cấp các tour du lịch, khách sạn và hợp tác với
                    các hãng hàng không để mang đến dịch vụ đa dạng và chất
                    lượng nhất cho du khách.
                  </p>
                </div>

                <div className="info">
                  <h4>2. Tại sao chọn chúng tôi?</h4>
                  <p>
                    Chúng tôi mong muốn mang đến cho du khách những dịch vụ du
                    lịch chất lượng thông qua trải nghiệm thực tế của đội ngũ
                    LATRAVEL nhiệt huyết, tận tâm và chuyên nghiệp.
                  </p>
                  <div className="features-grid">
                    <div className="feature">
                      <div className="icon">
                        <i class="ri-star-line" alt="Sản phẩm đa dạng"></i>
                      </div>
                      <h5>Sản phẩm đa dạng</h5>
                      <p>
                        Trên website của chúng tôi, du khách có thể dễ dàng tìm
                        kiếm thông tin chi tiết về các tour du lịch, bao gồm
                        lịch trình và điểm đến.
                      </p>
                    </div>

                    <div className="feature">
                      <div className="icon">
                        <i
                          class="ri-money-dollar-circle-line"
                          alt="Giá hấp dẫn"
                        ></i>
                      </div>
                      <h5>Giá cả hấp dẫn</h5>
                      <p>
                        LATRAVEL cam kết mang đến những dịch vụ chất lượng với
                        mức giá tốt nhất. Chúng tôi tin rằng số tiền bạn bỏ ra
                        hoàn toàn xứng đáng với trải nghiệm nhận được.
                      </p>
                    </div>

                    <div className="feature">
                      <div className="icon">
                        <i
                          class="ri-git-repository-private-line"
                          alt="Bảo mật dữ liệu"
                        ></i>
                      </div>
                      <h5>Bảo mật dữ liệu</h5>
                      <p>
                        Chúng tôi đảm bảo rằng tất cả thông tin cá nhân của
                        khách hàng sẽ được giữ bí mật tuyệt đối.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="info">
                  <h4>3. Dịch vụ của chúng tôi</h4>
                  <p>
                    LATRAVEL cung cấp nhiều dịch vụ du lịch đa dạng để mang lại
                    nhiều lựa chọn cho du khách:
                  </p>
                  <ul>
                    <p>Tour du lịch trong và ngoài nước.</p>
                    <p>Kiểm tra thời tiết tại điểm đến mong muốn.</p>
                    <p>
                      Thêm tour vào danh sách yêu thích và để lại đánh giá về
                      tour.
                    </p>
                    <p>Đặt phòng tại nhiều khách sạn khác nhau.</p>
                    <p>
                      Xem lại thông tin đơn đặt tour và trạng thái thanh toán
                      (đã thanh toán hoặc đã hủy).
                    </p>
                  </ul>
                  <p>
                    Ngoài ra, trong tương lai chúng tôi sẽ cung cấp thêm các
                    dịch vụ như thuê xe chất lượng cao, hướng dẫn viên du lịch,
                    visa, vé tàu... giúp khách hàng có chuyến đi thoải mái và
                    thuận tiện hơn.
                  </p>
                </div>

                <div className="info">
                  <h4>4. Đối tác của chúng tôi</h4>
                  <p>
                    Để xây dựng một hệ thống website nhanh chóng và mạnh mẽ,
                    cung cấp dịch vụ tốt nhất đến khách hàng, LATRAVEL xin gửi
                    lời cảm ơn đến các đối tác đã hỗ trợ và đồng hành cùng chúng
                    tôi:
                  </p>
                  <div className="partners">
                    <a
                      className="partner"
                      href="https://www.facebook.com/laduc.143"
                    >
                      <div className="partner-logo">
                        <img
                          src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1730600707~exp=1730604307~hmac=63d2ed023c4a722f90f9c59a0417ca2eba185a3b9323bf93f4a6ff988c6bd6d7&w=740"
                          alt="FARES Logo"
                        />
                      </div>
                      <div className="partner-info">
                        <h5>Lã Văn Đức</h5>
                        <p className="partner-category">
                          Phát triển phần mềm website
                        </p>
                        <p>
                          Lã Văn Đức là một lập trình viên Frontend chuyên tạo
                          ra các giao diện web tối ưu, thân thiện với người
                          dùng. Với kinh nghiệm về HTML, CSS, JavaScript và các
                          framework hiện đại như React, anh luôn ưu tiên trải
                          nghiệm của người dùng. Ngoài ra, anh cũng đóng vai trò
                          quan trọng trong việc xử lý và tối ưu hiệu suất ứng
                          dụng để cung cấp sản phẩm chất lượng cao đáp ứng yêu
                          cầu khách hàng.
                        </p>
                      </div>
                    </a>

                    {/* <a
                      className="partner"
                      href="https://www.facebook.com/nhanhhuynh244"
                    >
                      <div className="partner-logo">
                        <img
                          src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1730600707~exp=1730604307~hmac=63d2ed023c4a722f90f9c59a0417ca2eba185a3b9323bf93f4a6ff988c6bd6d7&w=740"
                          alt="Zestif Logo"
                        />
                      </div>
                      <div className="partner-info">
                        <h5>HUỲNH HỮU NHÂN</h5>
                        <p className="partner-category">
                          Công nghệ phần mềm - Backend
                        </p>
                        <p>
                          Huỳnh Hữu Nhân là một lập trình viên Backend xuất sắc,
                          chuyên về giải pháp kiến trúc hệ thống và xử lý dữ
                          liệu. Với kinh nghiệm làm việc trên các nền tảng như
                          Node.js, Python và cơ sở dữ liệu NoSQL, anh đã đóng
                          góp vào việc phát triển nhiều sản phẩm blockchain hàng
                          đầu, mang lại giá trị lớn cho khách hàng doanh nghiệp.
                        </p>
                      </div>
                    </a> */}
                  </div>
                </div>

                <div className="info contact-us">
                  <h4>5. Liên hệ với chúng tôi</h4>
                  <div className="contact-card">
                    <h5>CÔNG TY TNHH DU LỊCH VÀ DỊCH VỤ LATRAVEL</h5>
                    <p>Mã số thuế: 1111111111</p>
                    <p>Số giấy phép kinh doanh: 1111111111</p>
                    <p>Cấp bởi: Sở Kế hoạch và Đầu tư TP. Hà Nội</p>
                    <p>
                      <strong>Địa chỉ: </strong>Minh Khai, Bắc Từ Liêm, TP. Hà
                      Nội
                    </p>
                    <p>
                      <strong>Điện thoại:</strong> 0901780640
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:lavanduc143@gmail.com">
                        lavanduc143@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <ScrollButton />
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
