// @flow
import React, { useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
import { SkeletonNewCourses } from "./skeletonNewCourses/skeletonNewCourses";
import numeral from "numeral";
import newCourseImage from "../../../../public/image/new_course.jpg";

import { Link } from "react-router-dom";

SwiperCore.use([Mousewheel, Pagination]);

export const NewCourses = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="new-courses">
      <div
        className="new-courses__image"
        style={{ backgroundImage: `url(${newCourseImage})` }}
      ></div>

      <div className="new-courses-body">
        <p className="new-courses-body__title">Khóa học mới nhất</p>

        <div className="body-content">
          {props.courses.length === 0 ? (
            <SkeletonNewCourses></SkeletonNewCourses>
          ) : (
            <Swiper
              direction={"vertical"}
              slidesPerView={3}
              spaceBetween={0}
              mousewheel={true}
              pagination={{
                clickable: true,
              }}
              className="body-content__swiper"
            >
              {props.courses.map((course) => {
                return (
                  <SwiperSlide className="swiper__item">
                    {" "}
                    <div className="body-item">
                      <div className="body-item__header">
                        <div className="body-item__date">
                          <p className="high-light-circle">
                            {new Date(course.createAt).getDate()}
                          </p>
                          {new Date(course.createAt).toGMTString().substr(8, 8)}
                        </div>
                        <div className="body-item__category-name">
                          {course.catName}
                        </div>
                      </div>

                      <div className="body-item__content">
                        <div className="course-info">
                          <Link
                            to={`/courses/${course.id}`}
                            className="course-info__name"
                          >
                            {course.courName}
                          </Link>
                          <div className="course-info__mentor">
                            Mr. {course.teacherName}
                          </div>
                        </div>
                        <div className="body-item__price">
                          <div className="cover-before">zxc</div>
                          <p>{numeral(course.price).format("0,0")} VND</p>
                          <div className="cover-after"> </div>
                        </div>
                      </div>

                      <div className="body-item__bar"></div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};
