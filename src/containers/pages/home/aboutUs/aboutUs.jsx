// @flow
import React from "react";
import "./style.scss";
import { Button } from "../../../../components";
import imgEdu from "../../../../public/image/education.png";
export const AboutUs = (props) => {
  return (
    <div className="about-us">
      <div className="about-us__background"></div>
      <div className="wrap">
        <div className="about-us__image">
          <img src={imgEdu}></img>
        </div>
        <div className="about-us__content">
          <h2 className="about-us__content-title">
            Hệ thống khóa học trực tuyến của chúng tôi
          </h2>
          <p className="about-us__content-desc">
            Chúng tôi cung cấp tất cả các khóa học ở mọi lĩnh vực, đáp ứng đầy
            đủ nhu cầu học tập và tìm hiểu kiến thức mới của mọi người. Với sự
            hỗ trợ của tất cả các giảng viên trên thế giới chúng tôi cam kết
            mang đến cho bạn kết quả tốt nhất.
          </p>
          <Button
            className="about-us__content-btn btn--color-white btn--hover-vertical-change-color-reverse"
            content="Tìm hiểu thêm"
          >
            <i
              className="fa fa-chevron-right about-us__content-icon"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
