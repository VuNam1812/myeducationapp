// @flow
import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
let exists = [];
export const ViewCourses = (props) => {
  const [rotate, setRotate] = useState(true);
  const [active, setActive] = useState(0);
  const [carousel, setCarousel] = useState([]);
  const [carouselAnim, setCarouselAnim] = useState([]);

  useEffect(() => {
    generateCarousel(0);
  }, [props.courses]);

  const generateCarousel = (direct) => {
    const arrTemp = [];
    for (let index = 0; index < props.courses.length; index++) {
      arrTemp.push("hidden");
    }

    arrTemp[
      calcNumber(active + direct, 0, props.courses.length - 1, direct)
    ] = `active`;
    arrTemp[
      calcNumber(active + direct - 1, 0, props.courses.length - 1, direct)
    ] = "prev";
    arrTemp[
      calcNumber(active + direct + 1, 0, props.courses.length - 1, direct)
    ] = "next";
    arrTemp[
      calcNumber(active + direct - 2, 0, props.courses.length - 1, direct)
    ] = `wait-prev`;
    arrTemp[
      calcNumber(active + direct + 2, 0, props.courses.length - 1, direct)
    ] = "wait-next";
    exists = [];
    setCarousel(arrTemp);
    setRotate(true);
  };

  const generateCarouselAnim = (direct) => {
    const arrTemp = [];
    for (let index = 0; index < props.courses.length; index++) {
      arrTemp.push("hidden");
    }

    arrTemp[calcNumber(active, 0, props.courses.length - 1, direct)] = `${
      direct === 0
        ? ""
        : direct === 1
        ? "active-anim-prev-reverse"
        : "active-anim-next-reverse"
    }`;
    arrTemp[calcNumber(active - 1, 0, props.courses.length - 1, direct)] = `${
      direct === 0
        ? ""
        : direct === 1
        ? "prev-to-wait-anim"
        : "active-anim-prev"
    }`;
    arrTemp[calcNumber(active + 1, 0, props.courses.length - 1, direct)] = `${
      direct === 0
        ? ""
        : direct === 1
        ? "active-anim-next"
        : "next-to-wait-anim"
    }`;
    arrTemp[calcNumber(active - 2, 0, props.courses.length - 1, direct)] = `${
      direct === 0 ? "" : direct === 1 ? "" : "wait-to-prev-anim"
    }`;
    arrTemp[calcNumber(active + 2, 0, props.courses.length - 1, direct)] = `${
      direct === 0 ? "" : direct === 1 ? "wait-to-next-anim" : ""
    }`;

    exists = [];
    setCarouselAnim(arrTemp);
    setTimeout(() => {
      generateCarousel(direct);
    }, 370);
  };

  const calcNumber = (value, min, max, direct) => {
    let current = value > max ? min : value < min ? max : value;
    for (let index = 0; index <= max; index++) {
      if (exists.includes(current)) {
        current += direct === 0 ? -1 : direct;
      } else {
        break;
      }
    }

    exists.push(current);
    return current;
  };

  const handleNextBtn = () => {
    if (!rotate) return;
    setActive(active + 1 > props.courses.length - 1 ? 0 : active + 1);
    generateCarouselAnim(1);
    setRotate(false);
  };

  const handlePrevBtn = () => {
    if (!rotate) return;
    setActive(active - 1 < 0 ? props.courses.length - 1 : active - 1);
    generateCarouselAnim(-1);
    setRotate(false);
  };

  return (
    <div className="view-courses">
      <p className="view-courses__header">Khóa Học Được Xem Nhiều Nhất</p>
      <div className="wrap">
        <div className="carousel">
          {props.courses.map((course, index) => {
            return (
              <div
                className={`carousel__item ${carousel[index]} ${carouselAnim[index]}`}
              >
                <div
                  className="image"
                  style={{
                    backgroundImage: `url("${course.srcImage}")`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        <div className="course-preview">
          <Link
            to={`/courses/${props.courses[active]?.id}`}
            className="course-preview__name"
          >
            {props.courses[active] && props.courses[active].courName}
          </Link>
          <p className="course-preview__category">
            {props.courses[active] && props.courses[active].catName}
          </p>
        </div>
      </div>
      <div className="btn-group">
        <div className="btn-control" onClick={handlePrevBtn}>
          <i
            class="fa fa-angle-left fa-2x btn-control__icon"
            aria-hidden="true"
          ></i>
        </div>
        <div className="btn-control" onClick={handleNextBtn}>
          <i
            class="fa fa-angle-right fa-2x btn-control__icon"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
};
