import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { formattedTime } from "../../utils/formatTime";
import "./riderItem.styles.scss";

const RiderItem = forwardRef(
  ({ ride: { pickup, created_at, total }, id }, ref) => {
    return (
      <div ref={ref} className="riderItem">
        <div className="riderItem__header">
          <span>{formattedTime(created_at)}</span>
          <span className="riderItem__total">
            Total fare ${total.split(" ")[1]}
          </span>
        </div>
        <Link className="riderItem__description" to={`/riders/${id}`}>
          <span className="riderItem__content">{pickup}</span>
          <AiOutlineRight />
        </Link>
      </div>
    );
  }
);

export default RiderItem;
