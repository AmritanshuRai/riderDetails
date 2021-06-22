import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRiders } from "./ridersList.slice";

import RiderItem from "../../components/riderItem/RiderItem";
import Loader from "../../components/loader/Loader";

import "./ridersList.styles.scss";
const RiderList = () => {
  const dispatch = useDispatch();
  const { loading, allRiders, hasMoreRiders } = useSelector(
    (state) => state.ridersList
  );
  //to get current page on component re render
  const [pageNum, setPageNum] = useState(parseInt(allRiders?.length / 10) || 1);

  useEffect(() => {
    if (!hasMoreRiders) return;
    dispatch(fetchRiders(pageNum));
    // eslint-disable-next-line
  }, [pageNum]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading === "loading" || !hasMoreRiders) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreRiders]
  );

  return (
    <>
      {allRiders.map(({ id, ride }, i) => {
        if (allRiders.length === i + 1) {
          return (
            <RiderItem ref={lastElementRef} key={id} ride={ride} id={id} />
          );
        }
        return <RiderItem key={id} ride={ride} id={id} />;
      })}
      {loading === "loading" ? <Loader /> : null}
    </>
  );
};

export default RiderList;
