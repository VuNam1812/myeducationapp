// @flow 
import * as React from 'react';
import './style.scss';
import { Logo } from '../../components';
import floor from '../../public/image/floor.jpg';
import coverBook from '../../public/image/background_book.jpg';
export const InComing = (props) => {
    return (
      <div className="incoming" style={{ backgroundImage: `url(${floor})` }}>
        <div className="wrap">
          <div className="book">
            <div
              className="book__cover"
              style={{ backgroundImage: `url(${coverBook})` }}
            ></div>
            <Logo className="book__logo logo--80"></Logo>
            <p className="book__author">
              Design by <span>VuNam</span>
            </p>
          </div>
          <div className="incoming__detail">
            <p className="incoming__detail-title">Incoming book</p>
            <div className="incoming__detail-time">
              <div className="group-item">
                <p className="title">UI/UX Master</p>
                <div className="date">
                  <span className="high-light-circle">23</span> MAY 2021
                </div>
              </div>
              <div className="category-name">Development | Web Development</div>
              <p className="desc">
                Phasellus enim magna, varius et commodo ut, ultricies vitae
                velit. Ut nulla tellus, eleifend euismod pellentesque vel,
                sagittis vel justo. In libero urna, venenatis sit amet ornare
                non, suscipit nec risus. Sed consequat justo non mauris pretium
                at tempor justo sodales. Quisque tincidunt laoreet malesuada.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};