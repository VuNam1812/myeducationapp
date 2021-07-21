// @flow 
import * as React from 'react';
import './style.scss'
import { Button } from '../../../../components';

export const ReadyJoin = (props) => {
    return (
        <div className='ready-join'>
            <div className='clip-path'>
            </div>
            <div className='ready-join__content'>
                <div className='wrap'>
                    <p className='ready-join__content-title'>Bạn đã sẵn sàng chưa?</p>
                    <p className='ready-join__content-desc'>Tham gia cùng chúng tôi để học thêm nhiều kiến thức mới. Bắt đầu học ngay hôm nay nào, cùng lướt tìm kiếm những khóa học tốt nhất.</p>
                    <div className='btn-group'>
                        <Button className='btn--hover-vertical-change-color' content='Hướng dẫn'><i className="fa fa-chevron-right btn-group__icon" aria-hidden="true" /></Button>
                        <Button className='btn--color-white btn--hover-vertical-change-color-reverse' content='Khóa học'><i className="fa fa-chevron-right btn-group__icon" aria-hidden="true" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};