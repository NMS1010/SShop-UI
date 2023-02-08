import classNames from 'classnames/bind';
import styles from './ModalWrapper.module.scss';
const cx = classNames.bind(styles);
const ModalWrapper = ({ children, color = 'rgba(0, 0, 0, 0.5)' }) => {
    return (
        <div style={{ backgroundColor: color }} className={cx('wrapper')}>
            {children}
        </div>
    );
};

export default ModalWrapper;
