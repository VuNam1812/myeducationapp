// @flow
import React from "react";
import "./style.scss";
import numeral from "numeral";
import { Button } from "../../../../components";
import { Link } from "react-router-dom";
import { handlePayment } from "../middleware/handlePayment";
import Swal from "sweetalert2";
export const ConfirmCourse = ({ course, account, dispatch }) => {
  const loading = false;
  const handlePaymentCourse = () => {
    Swal.fire({
      title: "Đang thanh toán...",
      didOpen: async () => {
        Swal.showLoading();
        await handlePayment.paymentCourse(course.id, dispatch);
      },
    });
  };

  return (
    <div className="confirm-course">
      <div className="info-payment">
        <p className="info-payment__title">Thông tin Khóa học</p>
        {Object.keys(course).length === 0 ? (
          <div className="info-payment__loading">
            <i className="icon fa fa-spinner fa-pulse fa-2x fa-fw"></i>
          </div>
        ) : (
          <div className="info-payment__course-pay">
            {course.srcImage && (
              <div
                className="course-pay__image"
                style={{
                  backgroundImage: `url("${course.srcImage}")`,
                }}
              ></div>
            )}
            <div className="course-pay__body-content">
              <Link
                to={`/courses/${course.id}`}
                className="body-content__title-course"
              >
                {course.courName}
              </Link>
              <Link
                to={`/teachers/${course.id}`}
                className="body-content__teacher-name"
              >
                Giảng viên: <span>{course.teacherName}</span>
              </Link>
              <p className="body-content__price-course">
                Học phí: <span>{numeral(course.price).format("0,0")} VND</span>
              </p>
            </div>
          </div>
        )}
        <p className="info-payment__noticed">
          * Khóa học sẽ được kích hoạt khi thanh toán thành công
        </p>
      </div>
      <div className="user-payment">
        <p className="user-payment__title">Thông tin khách hàng</p>
        {Object.keys(account).length === 0 ? (
          <div className="user-payment__loading">
            <i className="icon fa fa-cog fa-spin fa-2x fa-fw"></i>
          </div>
        ) : (
          <div className="user-payment__info">
            <p className="info__item">
              <i className="icon fa fa-user-circle-o" aria-hidden="true"></i>
              {account.name}
            </p>
            <p className="info__item">
              <i className="icon fa fa-envelope" aria-hidden="true"></i>
              {account.email}
            </p>
            <p className="info__item">
              <i className="icon fa fa-phone-square" aria-hidden="true"></i>
              {account.phone}
            </p>
          </div>
        )}
        <Button
          onClick={handlePaymentCourse}
          className="user-payment__btn-pay btn-smaller btn--color-white"
          content="Thanh toán"
        ></Button>
      </div>
    </div>
  );
};
