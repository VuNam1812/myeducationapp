// @flow
import React, { useState } from "react";
import { SkeletonTopCourses } from "./skeletonTopCourses/skeletonTopCourses";
import "./style.scss";
import { Button } from "../../../../components";
import { CourseCard } from "../../../itemsPage";
export const TopCourses = (props) => {
  return (
    <div className="top-courses">
      <div className="wrap">
        <div className="top-courses-item">
          <div className="top-courses-item__title">
            <h2 className="top-courses-item__title-main">
              Các khóa học nổi bật
            </h2>
            <p className="top-courses-item__title-desc">
              Các khóa học được đánh giá cao nhất với số lượng học viên đông
              đảo. Tìm kiếm khóa học chưa bao giờ là khó khăn, tiếp cận nhanh
              chóng bằng một vài thao tác đơn giản.
            </p>
          </div>
          <Button
            className="top-courses-item__btn-all btn--hover-horizontal-change-color"
            content="Xem thêm"
          ></Button>
        </div>
        {props.courses.length === 0 ? (
          <SkeletonTopCourses></SkeletonTopCourses>
        ) : (
          props.courses.map((course) => {
            return (
              <CourseCard
                className="top-courses-item"
                course={course}
              ></CourseCard>
            );
          })
        )}
      </div>
    </div>
  );
};
