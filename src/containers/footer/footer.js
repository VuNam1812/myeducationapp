import React from 'react';
import './style.scss';
import { Logo } from '../../components';
import { CoverFooter } from './coverFooter/coverFooter';
export const Footer = (props) => {
    return (
      <div className="footer">
        {props.coverFooter && <CoverFooter></CoverFooter>}
        <div className="wrap">
          <div className="footer__contents">
            {contents.map((item, index) => {
              return (
                <div key={index} className="col--1--of--5">
                  <div className="content__title">
                    <h3 className="lite">{item.title}</h3>
                  </div>
                  <div className="content__links">
                    {item.data.map((text, index) => {
                      return (
                        <div key={index} className="content content--hover">
                          <a href="#">
                            <p className="text">{text}</p>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="col--2--of--5">
              <div className="content__title">
                <Logo className="logo--inline logo--shadow"></Logo>
              </div>
              <div className="content__links">
                <div className="content">
                  <a href="#">
                    <p className="text" style={{ fontSize: "1.1rem" }}>
                      MyEdu is open-source and free to the community. Your
                      donations go a long way towards making that possible.
                    </p>
                  </a>
                </div>
                <div className="content">
                  <a href="#">
                    <div
                      className="text"
                      style={{
                        fontSize: "1rem",
                        color: "#05c0a5",
                        display: "flex",
                        marginBottom: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="fa fa-youtube-play fa-2x"
                        style={{ color: "red", marginRight: "0.5rem" }}
                        aria-hidden="true"
                      ></i>
                      <span> Youtube</span>
                    </div>
                  </a>
                </div>
                <div className="content">
                  <a href="#">
                    <div
                      className="text"
                      style={{
                        fontSize: "1rem",
                        color: "#05c0a5",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="fa fa-facebook-square fa-2x"
                        style={{ color: "darkBlue", marginRight: "0.5rem" }}
                        aria-hidden="true"
                      ></i>
                      <span> Facebook</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr style={{ width: "100%", opacity: "0.5", marginTop: "2rem" }} />
          <div className="footer__notes row">
            <div>
              <p>Pricing taken from </p>
              <span>VuNam</span>
            </div>
            <p>© 2021 MyEdu. All Rights reserved.</p>
          </div>
        </div>
      </div>
    );
};

const aboutUsArray = ['Afficiates',
    'Partners', 'Reviews',
    'Blogs', 'Newsletter',];

const resourseArray = ['Privacy Policy', 'Support Area',
    'Documentations', 'How it works',
    'Terms of Policy',];

const quickLinkArray = ['home', 'About us',
    'Features', 'Pricing',
    'Contact',];

const contents = [{
    title: 'About us',
    data: aboutUsArray
}, {
    title: 'Resource',
    data: resourseArray
}, {
    title: 'Quick Links',
    data: quickLinkArray
}];
