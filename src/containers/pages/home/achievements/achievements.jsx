// @flow
import * as React from "react";
import "./style.scss";

import totalCourseImage from "../../../../public/image/open-book.png";
import totalStudentImage from "../../../../public/image/graduate.png";
import globelImage from "../../../../public/image/worldwide.png";

export const Achievements = (props) => {
  return (
    <div className="achievements">
      <div className="wrap">
        <div className="achievements__header">
          <p className="achievements__header-title">Thành tựu của chúng tôi</p>
          <p className="achievements__header-desc">
            Những thành tựu quan trọng mà chúng tôi đạt được đã đem lại sự thành
            công cho các học viên tham gia. Chúng tôi mong
            muốn mang đến thêm nhiều bài học giá trị và tiếp tục đổi mới,
            phát triển sự đa dạng các khóa học.
          </p>
        </div>
        <div className="achievements__body">
          <div className="body-item">
            <div className="body-item__image">
              <img src={totalCourseImage}></img>
            </div>
            <p className="body-item__title">Tổng khóa học</p>
            <p className="body-item__count">50+</p>
          </div>

          <div className="body-item item-image-blue">
            <div className="body-item__image">
              <img src={totalStudentImage}></img>
            </div>
            <p className="body-item__title">Tổng học viên</p>
            <p className="body-item__count">45K+</p>
          </div>

          <div className="body-item item-image-organge">
            <div className="body-item__image">
              <img src={globelImage}></img>
            </div>
            <p className="body-item__title">Mức độ phổ biến</p>
            <p className="body-item__count">115</p>
          </div>
        </div>
      </div>
    </div>
  );
};
