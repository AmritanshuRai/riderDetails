import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

import { formattedTime } from "../../utils/formatTime";
import { fetchRidersDetail, postRating } from "./riderDetails.slice";
import Loader from "../../components/loader/Loader";
import "./riderDetails.styles.scss";

const RiderDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [reviewValue, setReviewValue] = useState("");
  const [selectValue, setSelectValue] = useState(1);
  const {
    ridersDetail: { ride },
    error,
    loading,
  } = useSelector((state) => state.ridersDetails);
  const { created_at, total, dropoff, map: mapStr } = ride || {};

  useEffect(() => {
    dispatch(fetchRidersDetail(id));
    // eslint-disable-next-line
  }, [id]);

  const handleReviewChange = (e) => {
    setReviewValue(e.target.value);
  };
  const handleSelectionChange = (e) => {
    setSelectValue(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postRating({
        rating: selectValue,
        message: reviewValue,
        id,
      })
    );
  };
  if (loading !== "loaded")
    return (
      <section className="riderDetails">
        <Loader />
      </section>
    );
  if (error) return null;
  return (
    <section className="riderDetails">
      <Link className="riderDetails__back" to="/">
        <IoReturnDownBack />
        Go back
      </Link>
      <div className="riderDetails__wrapper">
        <div className="riderDetails__header">
          <span>{formattedTime(created_at)}</span>
        </div>
        <div className="riderDetails__description">
          <span className="riderDetails__content">{dropoff}</span>
          <span className="riderDetails__total">
            Total fare ${total.split(" ")[1]}
          </span>
          <img src={mapStr} alt="map" />
          <form className="riderDetails__form" onSubmit={handleFormSubmit}>
            <p>Rate your driver</p>

            <div className="box">
              <select value={selectValue} onChange={handleSelectionChange}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <option value={item} key={item}>
                    {item} star
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              className="riderDetails__input"
              onChange={handleReviewChange}
              value={reviewValue}
              disabled={selectValue < 3}
              placeholder="optional review"
            />
            <button type="submit" className="riderDetails__submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RiderDetails;
