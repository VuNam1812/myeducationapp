// @flow 
import React, { useState, useRef } from 'react';
import './style.scss';
import banner from '../../../../../public/image/banner.png';
export const ImageBanner = (props) => {
    const bannerImage = useRef();
    const [enable, setEnable] = useState(false);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const handleMouseEnter = () => {
        setEnable(true);
    }

    const handleMouseLeave = () => {
        setEnable(false);
        setRotate({ x: 0, y: 0 });
    }

    const handleMouseMove = (e) => {
        if (!enable) return;
        e.preventDefault();

        const defaultRange = 4;

        const posImage = {
            x: bannerImage.current.offsetLeft + (bannerImage.current.offsetWidth / 2),
            y: bannerImage.current.offsetTop + (bannerImage.current.offsetHeight / 2),
        }
        const posDis = {
            x: (posImage.x - e.pageX) / 100,
            y: (e.pageY - posImage.y) / 100
        }

        posDis.x = checkMinMax(-defaultRange, defaultRange, posDis.x);
        posDis.y = checkMinMax(-defaultRange, defaultRange, posDis.y);

        setRotate({ ...posDis });
    }

    const checkMinMax = (min, max, value) => {
        return (value > max) ? max : (value < min) ? min : value;
    }

    return (
        <div className='image-banner' onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={bannerImage}
            style={{
                willChange: 'transform',
                transform: `perspective(300px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`
            }}>
            <img src={banner}></img>
        </div>
    );
};