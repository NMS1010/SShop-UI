import classNames from 'classnames/bind';
import styles from './ModalWrapper.module.scss';
const cx = classNames.bind(styles);
const ModalWrapper = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default ModalWrapper;
