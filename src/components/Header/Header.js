import React, { useRef, useState, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
// import logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";

const nav__links = [
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
  // {
  //   path: "/hotel",
  //   display: "Khách sạn",
  // },
  {
    path: "/weather",
    display: "Thời tiết",
  },
  {
    path: "/about",
    display: "Về chúng tôi",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const logout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/sign-out`, {
        method: "POST", // Xác nhận rằng phương thức POST hoặc GET được dùng đúng như server yêu cầu
        credentials: "include", // Gửi kèm cookies nếu cần
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Error during logout:", result.message);
        //alert(result.message || "Logout failed. Please try again.");
        toast.err(result.message || "Đăng xuất thất bại");
      } else {
        // Clear user data and redirect to homepage
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      //alert("Logout failed. Please try again.");
      toast.error("Đăng xuất thất bại");
    }
  };

  // Sticky header functionality
  useEffect(() => {
    const stickyheaderFunc = () => {
      if (headerRef.current) {
        window.addEventListener("scroll", () => {
          if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
          ) {
            headerRef.current.classList.add("sticky__header");
          } else {
            headerRef.current.classList.remove("sticky__header");
          }
        });
      }
    };

    // stickyheaderFunc();
    // Attach the event listener
    window.addEventListener("scroll", stickyheaderFunc);
    return () => window.removeEventListener("scroll", stickyheaderFunc);
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle menu item selection
  const handleMenuItemClick = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    // console.log(user);
    // console.log(isMobile);
  });

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <Link to="/" className="logo">
              <img src={logo} alt="" />
            </Link>

            <div className="navigation">
              <ul className="menu d-flex align-items-center">
                {nav__links.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              {isMobile &&
                user && ( // Show mobile menu only if the user is logged in
                  <span
                    className="mobile__menu"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <i className="ri-menu-line"></i>
                  </span>
                )}

              {dropdownOpen && isMobile && (
                <div
                  className={`dropdown__menu ${dropdownOpen ? "active" : ""}`}
                >
                  <div className="user__info">
                    {user && (
                      <>
                        <img
                          src={user.avatar}
                          className="user__img"
                          alt="User Avatar"
                        />
                        <h5 className="mb-0">{user.username}</h5>
                      </>
                    )}
                  </div>
                  <ul className="menu d-flex flex-column">
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/homepage">Trang chủ</NavLink>
                    </li>
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/blogs">Blogs</NavLink>
                    </li>
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/tours">Tours</NavLink>
                    </li>
                    {/* <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/hotel">Khách sạn</NavLink>
                    </li> */}
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/weather">Thời tiết</NavLink>
                    </li>
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/about">Về chúng tôi</NavLink>
                    </li>
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <NavLink to="/profile">Cá nhân</NavLink>
                    </li>
                    {user && user.role === "admin" && (
                      <li className="nav__item" onClick={handleMenuItemClick}>
                        <NavLink to="/admin">Admin Panel</NavLink>
                      </li>
                    )}
                    <li className="nav__item" onClick={handleMenuItemClick}>
                      <Button className="btn btn-dark w-100" onClick={logout}>
                        Đăng xuất
                      </Button>
                    </li>
                  </ul>
                </div>
              )}

              {/* Show Login and Register buttons when the user is not logged in */}
              {!user ? (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">Đăng nhập</Link>
                  </Button>

                  <Button className="btn primary__btn">
                    <Link to="/register">Đăng kí</Link>
                  </Button>
                </>
              ) : (
                // Show user avatar and dropdown when logged in and screen size is larger than 768px
                !isMobile && (
                  <div
                    className="user__menu"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={user.avatar}
                      className="user__img"
                      alt="User Avatar"
                    />
                    {dropdownOpen && (
                      <div className="dropdown__menu">
                        <h5 className="mb-0">{user.username}</h5>
                        <Link
                          to="/profile"
                          className="dropdown__item profile-item"
                        >
                          Cá nhân
                        </Link>
                        <Link
                          to="/history"
                          className="dropdown__item profile-item"
                        >
                          Tour đã đặt
                        </Link>
                        {/* <Link
                          to="/hotelBooking"
                          className="dropdown__item profile-item"
                        >
                          Hotel Booking
                        </Link> */}
                        <Link
                          to="/favourite"
                          className="dropdown__item profile-item"
                        >
                          Tour yêu thích
                        </Link>
                        {user && user.role === "admin" && (
                          <Link
                            to="/admin"
                            className="dropdown__item profile-item"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <Button
                          className="btn btn-dark dropdown__item w-100"
                          onClick={logout}
                        >
                          Đăng xuất
                        </Button>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
