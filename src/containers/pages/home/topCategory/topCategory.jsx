// @flow
import React from "react";
import "./style.scss";
import numeral from "numeral";
import { useHistory } from "react-router-dom";

export const TopCategory = (props) => {
  const history = useHistory();

  const handleRedirect = (e) => {
    const index = e.currentTarget.getAttribute("data-id");

    history.push(`/categories/${index}`);
  };

  return (
    <div className="top-categories">
      <div className="wrap">
        <div className="top-categories__body">
          <div className="body-group">
            {props.cats.map((cat) => {
              return (
                <div
                  data-id={cat.id}
                  key={cat.id}
                  className="body-item"
                  onClick={handleRedirect}
                >
                  <div
                    className="body-item__image"
                    style={{
                      backgroundImage: `url(${cat.srcImage})`,
                    }}
                  ></div>
                  <div className="body-item__content">
                    <p className="body-item__content-cat-name">{cat.catName}</p>
                    <p className="body-item__content-joiner">
                      ({numeral(cat.joinerCount).format("0,0")}) Người đăng ký
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
