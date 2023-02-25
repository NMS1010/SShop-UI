import styles from './NotifyBoard.module.scss';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import OutsideAlerter from '../OutsideAlerter';
const cx = classNames.bind(styles);

const NotifyBoard = ({ TitleComponent = () => {}, children }) => {
    const [isOutClick, setIsOutClick] = useState(false);

    return (
        !isOutClick && (
            <OutsideAlerter setIsOut={setIsOutClick}>
                <div className={cx('container')}>
                    <div className={cx('header')}>
                        <TitleComponent />
                        {/* <p className={cx('title')}>{title}</p> */}
                    </div>
                    <div className={cx('content')}>{children}</div>
                </div>
            </OutsideAlerter>
        )
    );
};
NotifyBoard.propTypes = {
    TitleComponent: PropTypes.func,
    children: PropTypes.node,
};
export default NotifyBoard;
