// @flow
import React from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
import { CourseCard } from "../../../itemsPage";

export const CourseCat = ({ courses }) => {
  SwiperCore.use([Mousewheel, Pagination]);
  return (
    <div className="course-cat">
      <h2 className="course-cat__title">Khóa học cùng lĩnh vực</h2>

      {courses.length === 0 ? (
        <p className="course-cat__block-empty">(Hiện đang còn trống)</p>
      ) : (
        <Swiper
          slidesPerView={5}
          spaceBetween={16}
          className="mySwiper course-cat__block-courses"
        >
          {courses.map((course) => {
            return (
              <SwiperSlide className="course-cat__slide-item">
                <CourseCard
                  className="slide-item__card item--fill-max card--zoom-80"
                  course={course}
                ></CourseCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};
