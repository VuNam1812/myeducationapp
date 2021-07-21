// @flow
import React from "react";
import "./style.scss";

import detailImg from "../../../../public/image/icon/details.png";
import selectImg from "../../../../public/image/icon/select.png";
import completeImg from "../../../../public/image/icon/agreement.png";

export const ProcessBar = (props) => {
  return (
    <div className="process-bar">
      <div className="process-bar__item active">
        <div className="item__image">
          <img src={detailImg}></img>
        </div>
        <p className="item__name">Tham khảo khóa học</p>
      </div>
      <div className="process-bar__bar active"></div>
      <div className="process-bar__item active">
        <div className="item__image">
          <img src={selectImg}></img>
        </div>
        <p className="item__name">Tham gia khóa học</p>
      </div>
      <div
        className={`process-bar__bar ${props.active === 2 ? "active" : ""}`}
      ></div>
      <div
        className={`process-bar__item ${props.active === 2 ? "active" : ""}`}
      >
        <div className="item__image">
          <img src={completeImg}></img>
        </div>
        <p className="item__name">Hoàn thành</p>
      </div>
    </div>
  );
};
