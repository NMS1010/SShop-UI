import styles from './NotifyBoard.module.scss';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const NotifyBoard = ({ title, children }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <p className={cx('title')}>{title}</p>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};
NotifyBoard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};
export default NotifyBoard;
