import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
const Button = () => {
    return (
        <div className={cx('container')}>
            <button className={cx('button')}></button>
        </div>
    );
};
export default Button;
