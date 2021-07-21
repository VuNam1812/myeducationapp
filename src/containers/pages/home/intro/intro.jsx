// @flow 
import * as React from 'react';
import './style.scss'
import { Cover } from './cover/cover';
import { ImageBanner } from './imageBanner/imageBanner';
import { TopBanner } from './topBanner/topBanner';
export const Intro = (props) => {
    return (
        <div className='intro'>
            <div className='wrap'>
                <TopBanner></TopBanner>
                <ImageBanner></ImageBanner>
            </div>
            <Cover></Cover>
        </div>
    );
};