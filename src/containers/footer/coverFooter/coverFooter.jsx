// @flow
import * as React from "react";
import { Logo } from "../../../components";
import "./style.scss";
import leave1 from "../../../public/leaves/Layer 1.png";
import leave2 from "../../../public/leaves/Layer 4.png";
import leave3 from "../../../public/leaves/Layer 5.png";
import leave4 from "../../../public/leaves/Layer 6.png";
import leave5 from "../../../public/leaves/Layer 7.png";
import leave6 from "../../../public/leaves/Layer 8.png";
import cover from "../../../public/image/coverFooter.jpg";
export const CoverFooter = (props) => {
  return (
    <div className="cover-footer" style={{ backgroundImage: `url(${cover})` }}>
      <Logo className="logo--shadow"></Logo>
      <div className="leaves">
        <div className="leaves__item">
          <img alt={""} src={leave1}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave2}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave3}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave4}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave5}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave2}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave6}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave4}></img>
        </div>
      </div>
      <div className="leaves leaves--2">
        <div className="leaves__item">
          <img alt={""} src={leave1}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave2}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave3}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave4}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave5}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave2}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave6}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave4}></img>
        </div>
      </div>
      <div className="leaves leaves--3">
        <div className="leaves__item">
          <img alt={""} src={leave1}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave2}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave3}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave4}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave5}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave2}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave6}></img>
        </div>
        <div className="leaves__item">
          <img alt={""} src={leave4}></img>
        </div>
      </div>
    </div>
  );
};
