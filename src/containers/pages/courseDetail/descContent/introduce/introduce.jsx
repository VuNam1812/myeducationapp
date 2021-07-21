// @flow
import * as React from "react";
import "./style.scss";
import numeral from "numeral";
import { Link } from "react-router-dom";

import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
const StyleRating = withStyles({
  iconFilled: {
    color: "#00ab15",
  },
})(Rating);

export const Introduce = ({ course, teacher }) => {
  return (
    <div className="introduce">
      <p className="introduce__category">{course.catName}</p>
      <h2 className="introduce__name">{course.courName}</h2>
      <p className="introduce__mini-desc">{course.tinyDes}</p>

      <div className="course__statistics">
        <p className="course__statistics-joiner">
          {numeral(course.joinerCount).format("0,0")} học viên
        </p>
        <div className="rating">
          <div className="rating__stars">
            <p>{numeral(course.rate).format("0.0")}</p>
            {course.rate && (
              <StyleRating
                className="stars"
                value={course.rate}
                precision={0.1}
                readOnly
              ></StyleRating>
            )}
          </div>
          <p className="rating__number">
            ({numeral(course.feedbackCount).format("0,0")}) đánh giá
          </p>
        </div>

        <p className="course__statistics-viewer">
          {numeral(course.viewCount).format("0,0")} lượt xem
        </p>
      </div>
      {course.lastUpdate && (
        <p className="introduce__last-update">
          <i className="fa fa-exclamation-circle icon" aria-hidden="true"></i>
          Last updated {course.lastUpdate.substr(0, 10)}
        </p>
      )}

      <div className="introduce__learn">
        <p className="title--highlight">Mô tả chi tiết</p>
        <div className="content-title">
          {course.fullDes ? (
            <p
              className="content-title__fullDes"
              dangerouslySetInnerHTML={{ __html: course.fullDes }}
            ></p>
          ) : (
            <p className="content-title__empty">(Hiện đang trống)</p>
          )}
        </div>
      </div>
      <div className="introduce__teacher">
        <p className="title--highlight">Giảng viên</p>
        <div className="content-title content-teacher">
          <div className="mini-teacher-card">
            {course.teacherImage && (
              <div className="mini-teacher-card__image">
                <img
                  src={`${course.teacherImage}`}
                ></img>
              </div>
            )}
            <div className="mini-teacher-card__info">
              <Link
                to={`/teachers/${course.id_owner}`}
                className="mini-teacher-card__info-name"
              >
                {course.teacherName}
              </Link>
            </div>
            <div className="mini-teacher-card__contact">
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
            <Link
              to={`/teachers/${course.teacherId}`}
              className="mini-teacher-card__link"
            >
              Chi tiết <i class="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
