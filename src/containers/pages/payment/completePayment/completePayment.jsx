// @flow
import React from "react";
import "./style.scss";

import { Button } from "../../../../components";
import { useHistory } from "react-router-dom";
export const CompletePayment = ({ course }) => {
  const history = useHistory();
  return (
    <div className="complete-payment">
      <div className="complete-payment__icon-confirm">
        <i className="fa fa-check" aria-hidden="true"></i>
      </div>
      <p className="complete-payment__title">Đăng ký học thành công</p>

      <p className="complete-payment__desc desc--bold">
        <i className="icon fa fa-graduation-cap" aria-hidden="true"></i>
        Rất cảm ơn bạn đã ửng hộ <span className="text--main">MyEdu</span>. Hy
        vọng bạn có trải nghiệm tốt nhất với khóa học !!
        <i className="icon fa fa-graduation-cap" aria-hidden="true"></i>
      </p>
      <p className="complete-payment__desc">
        Nếu có bất kỳ thắc mắc, vấn đề liên quan đến khóa học. Đừng quên gửi
        phản hồi cho chúng tôi, những ý kiến đóng góp của bạn giúp chúng tôi
        hoàn thiện hơn !!
      </p>
      <div className="complete-payment__btn-group">
        <Button
          className="btn-smaller btn--color-white"
          content="Trở lại trang chủ"
          onClick={() => {
            history.push("/");
          }}
        ></Button>
        <Button
          className="btn-smaller btn--hover-horizontal-change-color"
          content="Bắt đầu học ngay"
          onClick={() => {
            history.push(`/lessions/${course.id}/${course.firstLecture}`);
          }}
        ></Button>
      </div>
    </div>
  );
};
