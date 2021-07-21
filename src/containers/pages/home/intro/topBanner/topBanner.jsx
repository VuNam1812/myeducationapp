// @flow
import * as React from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { Button } from "../../../../../components";
export const TopBanner = (props) => {
  const history = useHistory();
  return (
    <div className="top-banner">
      <h1 className="top-banner__title">
        The most beautiful thing about learning is that no one take that away
        form you
      </h1>
      <div className="btn-group">
        <Button
          className="btn--hover-vertical-change-color"
          content="Hướng dẫn"
        >
          <i
            className="fa fa-chevron-right btn-group__icon"
            aria-hidden="true"
          />
        </Button>
        <Button
          className="btn--color-white btn--hover-vertical-change-color-reverse"
          content="Khóa học"
          onClick={() => {
            history.push("/courses");
          }}
        >
          <i
            className="fa fa-chevron-right btn-group__icon"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
};
