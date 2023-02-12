import styles from './NotifyBoard.module.scss';
import classNames from 'classnames/bind';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const NotifyBoard = ({ TitleComponent = () => {}, children }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <TitleComponent />
                {/* <p className={cx('title')}>{title}</p> */}
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};
NotifyBoard.propTypes = {
    TitleComponent: PropTypes.object,
    children: PropTypes.node,
};
export default NotifyBoard;
