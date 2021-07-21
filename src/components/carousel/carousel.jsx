// @flow
import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import "../../styleRoot/color.scss";

let startPoint = 0;
let scrollLeft = 0;

export const Carousel = ({ activeNumber, dataSet }) => {
  const [numberPage, setNumberPage] = useState([]);
  const [pagiActive, setPagiActive] = useState(1);
  const [isDown, setIsDown] = useState(false);
  const bodyScroll = useRef();
  useEffect(() => {
    handleGeneratePagination();
  }, [activeNumber, dataSet]);

  const handleGeneratePagination = () => {
    const pageArr = [];
    const page = parseInt(dataSet.length / activeNumber);
    const subPage = dataSet.length % activeNumber === 0 ? 0 : 1;
    for (let index = 1; index <= page + subPage; index++) {
      pageArr.push({ index: index });
    }
    setNumberPage(pageArr);
  };

  const handleClickPagination = (e) => {
    const index = e.target.getAttribute("data-id");
    setPagiActive(+index);
  };

  const handleMouseDown = (e) => {
    setIsDown(true);

    startPoint = e.pageX - bodyScroll.current.offsetLeft;
    scrollLeft = bodyScroll.current.scrollLeft;
  };

  const handleMouseUp = (e) => {
    setIsDown(false);
  };

  const handleMouseLeave = (e) => {
    setIsDown(false);
  };

  const calcActivePage = () => {
    const maxScrollLeft =
      bodyScroll.current.scrollWidth - bodyScroll.current.clientWidth;
    const minRange =
      parseInt(maxScrollLeft / numberPage.length) * (pagiActive - 1);
    const maxRange = parseInt(maxScrollLeft / numberPage.length) * pagiActive;
    if (bodyScroll.current.scrollLeft > maxRange) {
      setPagiActive(
        pagiActive + 1 > numberPage.length ? numberPage.length : pagiActive + 1
      );
    }
    if (bodyScroll.current.scrollLeft < minRange) {
      setPagiActive(pagiActive - 1);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const current = e.pageX - bodyScroll.current.offsetLeft;
    const slide = current - startPoint;
    bodyScroll.current.scrollLeft = scrollLeft - slide;
    calcActivePage();
  };
  return (
    <div className="carousel">
      <div className="slider" ref={bodyScroll} onMouseLeave={handleMouseLeave}>
        {dataSet.length > 0 &&
          dataSet.map((item, index) => {
            return (
              <div
                className={`slider__item`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ minWidth: `${100 / activeNumber}vw` }}
              >
                <div className="children"></div>
              </div>
            );
          })}
      </div>
      <div className="pagination">
        {numberPage.length > 1 &&
          numberPage.map((item) => {
            return (
              <div
                data-id={item.index}
                className={`pagination__item item--${
                  item.index === pagiActive ? "active" : "disabled"
                }`}
                onClick={handleClickPagination}
              ></div>
            );
          })}
      </div>
    </div>
  );
};
