import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NotifyBoard from '../../../components/NotifyBoard';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('bar')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <p className={cx('title')}>title</p>
            </div>
            <div className={cx('action')}>
                <div className={cx('notify')}>
                    <NotifyBoard title={'test'}>
                        <p>content</p>
                    </NotifyBoard>
                    <FontAwesomeIcon icon={faBell} />
                </div>
                <div className={cx('user-detail')}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </header>
    );
};

export default Header;
