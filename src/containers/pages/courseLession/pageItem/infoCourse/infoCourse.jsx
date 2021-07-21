// @flow
import numeral from "numeral";
import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
export const InfoCourse = ({ course }) => {
  const history = useHistory();
  return (
    <div className="info-lession">
      <ul className="info-lession__header">
        <li className="info-lession__header-item active">Tổng quan</li>
      </ul>
      {course && (
        <div className="info-lession__body">
          <p className="info-lession__body-title">{course.courName}</p>

          <div className="course-info">
            <div className="course-info__item">
              <p>
                Số lượng học sinh:{" "}
                <span className="text--normal">
                  {numeral(course.joinerCount).format("0,0")}
                </span>
              </p>
              <p>
                Tổng số bài học:{" "}
                <span className="text--normal">{course.lectureCount}</span>
              </p>
                <p>
                  Tổng số giờ học:{" "}
                  <span className="text--normal">
              {course.duration && (
                    new Date(1000 * (course.duration ? course.duration : 0))
                      .toISOString()
                      .substr(11, 5)
                      )}
                  </span>
                </p>
            </div>
            <div className="course-info__item text--left">
              <p>Mô tả khóa học</p>
              <p className="text--normal course-info__main">{course.tinyDes}</p>
            </div>
            <div className="course-info__item text--left">
              <p>Giảng viên</p>
              <p
                className="course-info__teacher"
                onClick={() => {
                  history.push(`/teachers/${course.id_owner}`);
                }}
              >
                {course.teacherName}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
