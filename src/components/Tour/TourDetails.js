import React, { useEffect, useRef, useState, useContext } from "react";
import "./tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../../utils/avgRating";
import Booking from "../Booking/Booking";
import NewSletter from "../../shared/NewSletter";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import ScrollButton from "../../shared/ScrollButton";
import { toast } from "react-toastify";

const TourDetails = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  // fetch data from database
  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/${id}`, refreshKey);

  // desctructure properties from tour object
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    day,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleLikeClick = async () => {
    if (!user) {
      //alert("Please sign in to add to favorites");
      toast.error("Đăng nhập để tiếp tục");
      return;
    }

    const action = isLiked ? "remove" : "add"; // decide if we are adding or removing

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}/favorites`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ tourId: id, action: action }), // send the tourId and action
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error("Có lỗi xảy ra");
        return; //alert(result.message);
      }

      setIsLiked(!isLiked); // Toggle the like state
      //alert(result.message);
      toast.error(result.message);
    } catch (err) {
      //alert(err.message);
      toast.error(err.message);
    }
  };

  // submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    // alert(`You have rated ${tourRating} and your review is ${reviewText}`);

    // late will call our API
    try {
      if (!user || user === undefined || user === null) {
        //alert("Please sign in to submit review");
        toast.error("Đăng nhập để tiếp tục");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        avatarUser: user.avatar,
        rating: tourRating,
        userId: user?._id,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
        return;
        //alert(result.message);
      }
      setRefreshKey((prevKey) => prevKey + 1);
      // alert("Review submitted");
      //alert(result.message);
      toast.info(result.message);
    } catch (err) {
      // alert(err.message);
    }
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${BASE_URL}/users/${user._id}/favorites`);
        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message);
          return;
          //alert(result.message);
        }

        // Kiểm tra xem tourId có trong favorites hay không
        // setIsLiked(result.favorites.includes(id));
        setIsLiked(result.data.some((fav) => fav._id === id));
      } catch (err) {
        //alert(err.message);
        toast.error(err.message);
      }
    };

    checkIfLiked();
  }, [user, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const formattedPrice = price ? price.toLocaleString("vi-VN") : "0";
  const breakText = (text, maxLength) => {
    if (!text) return null; // Return null if text is undefined or null

    const chunks = [];

    // Loop through the text and slice it into chunks of maxLength
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.slice(i, i + maxLength));
    }

    // Join the chunks with a <br /> tag to break lines
    return chunks.map((chunk, index) => (
      <React.Fragment key={index}>
        {chunk}
        {index < chunks.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const formatDescription = (description) => {
    if (!description) return null; // Return null if description is undefined or null
    return description.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-cente pt-5">Loading......</h4>}
          {error && <h4 className="text-cente pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    {/* <h2 className="d-flex align-items-center gap-4">{title} <i class="ri-heart-line"></i></h2> */}
                    <h2 className="d-flex align-items-center gap-4">
                      {title}
                      <i
                        className={`ri-heart-${isLiked ? "fill" : "line"}`}
                        style={{
                          color: isLiked ? "red" : "black",
                          cursor: "pointer",
                        }}
                        onClick={handleLikeClick}
                      ></i>
                    </h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Chưa có đánh giá"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      {/* <span className="test">
                        <i class="ri-map-pin-fill"></i> {breakText(address, 60)}
                      </span> */}

                      <span>
                        <i class="ri-map-pin-2-line"></i> {city}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      {/* <span>
                        <i class="ri-map-pin-2-line"></i> {city}
                      </span> */}

                      <span className="test">
                        <i class="ri-map-pin-fill"></i> {breakText(address, 60)}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-wallet-3-line"></i> {formattedPrice} VND
                        /người
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-time-line"></i> {day} ngày
                      </span>
                      <span>
                        <i class="ri-group-line"></i> {maxGroupSize} người
                      </span>
                    </div>

                    <h5>Dercription</h5>
                    {/* <p>{breakText(desc, 100)}</p> */}
                    <p>{formatDescription(desc, 100)}</p>
                  </div>

                  {/* Review by user */}
                  <div className="tour__reviews mt-4">
                    <h4>Đánh giá ({reviews?.length} đánh giá)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} onClick={() => setTourRating(star)}>
                            {star}{" "}
                            <i
                              className={
                                star <= tourRating
                                  ? "ri-star-s-fill"
                                  : "ri-star-line"
                              }
                            ></i>
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Viết đánh giá của bạn"
                        />

                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                          required
                        >
                          Gửi
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={review.avatarUser} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>

                              <span className="d-flex align-items-center">
                                {review.rating} <i class="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <ScrollButton />

      <NewSletter />
    </>
  );
};

export default TourDetails;
