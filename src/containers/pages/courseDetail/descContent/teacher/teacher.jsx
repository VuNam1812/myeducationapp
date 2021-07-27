// @flow
import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import numeral from "numeral";
export const Teacher = ({ teacher }) => {
  return (
    <div className="teacher">
      <div className="teacher-group">
        <div className="item">
          <div className="decor">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="item__content">
            <div className="item__image-teacher">
              {teacher.srcImage && <img src={`${teacher.srcImage}`}></img>}
            </div>
            <div className="teacher-info">
              <div className="teacher-info__contact">
                <i
                  className="icon fa fa-2x fa-facebook-square"
                  aria-hidden="true"
                ></i>
                <i
                  className="icon fa fa-2x fa-twitter-square"
                  aria-hidden="true"
                ></i>
                <i
                  className="icon fa fa-2x fa-linkedin-square"
                  aria-hidden="true"
                ></i>
                <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
              </div>

              <div className="teacher-info__intro">
                <Link
                  to={`/teachers/${teacher.id}`}
                  className="teacher-info__intro-name"
                >
                  {teacher.name}
                </Link>
                <p className="teacher-info__intro-major">
                  {teacher.major || "( Hiện chưa cập nhật chuyên môn )"}
                </p>
                <div className="teacher-info__intro-achieve">
                  <div className="achieve-item">
                    <p className="achieve-item__count">
                      {numeral(teacher.studentCount).format("0,0")}
                    </p>
                    <p className="achieve-item__text">Học viên</p>
                  </div>
                  <div className="achieve-item">
                    <p className="achieve-item__count">
                      {numeral(teacher.courseCount).format("0,0")}
                    </p>
                    <p className="achieve-item__text">Khóa học</p>
                  </div>
                  <div className="achieve-item">
                    <div className="achieve-item__count">
                      {numeral(teacher.rate).format("0,0.(0)")}{" "}
                      <span className="text--smaller">
                        / 5{" "}
                        <i className="icon fa fa-star" aria-hidden="true"></i>
                      </span>
                    </div>
                    <p className="achieve-item__text">
                      {numeral(teacher.feedbackCount).format("0,0")} lượt đánh
                      giá
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item__intro-teacher">
            {teacher.teacherDesc?.length ? (
              <p
                className="intro-teacher__content"
                dangerouslySetInnerHTML={{ __html: teacher.teacherDesc }}
              ></p>
            ) : (
              "̣( Hiện chưa có thông tin mô tả )"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
