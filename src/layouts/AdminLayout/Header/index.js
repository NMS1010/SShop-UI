import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NotifyBoard from '../../../components/NotifyBoard';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as authAction from '../../../redux/actions/authAction';
import * as messageAction from '../../../redux/actions/messageAction';
const cx = classNames.bind(styles);

const Header = ({ title, currentUser, isLogin, dispatch }) => {
    const navigate = useNavigate();
    const [isShowNotify, setIsShowNotify] = useState(false);
    const [isShowUserOption, setIsShowUserOption] = useState(false);
    const handleShowNotify = () => {
        setIsShowNotify(!isShowNotify);
        setIsShowUserOption(false);
    };
    const handleShowUserOption = () => {
        setIsShowNotify(false);
        setIsShowUserOption(!isShowUserOption);
    };
    const logOut = () => {
        dispatch(authAction.logout());
        dispatch(
            messageAction.setMessage({
                id: Math.random(),
                title: 'Logout',
                message: 'Logout successfully',
                backgroundColor: '#5cb85c',
                icon: '',
            }),
        );
    };
    return (
        <header className={cx('container')}>
            <div className={cx('info')}>
                <div className={cx('bar')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <p className={cx('title')}>{title}</p>
            </div>
            <div className={cx('action')}>
                <div className={cx('notify')}>
                    {isShowNotify && (
                        <NotifyBoard title={'Notifications'}>
                            <p>content</p>
                        </NotifyBoard>
                    )}
                    <FontAwesomeIcon icon={faBell} onClick={() => handleShowNotify()} />
                </div>
                <div className={cx('user-detail')}>
                    {isShowUserOption && (
                        <NotifyBoard
                            TitleComponent={() => (
                                <div className="pt-5 pb-4 pe-4 ps-4">
                                    <div className="text-center">
                                        <img
                                            className="img-fluid img-thumbnail"
                                            style={{ borderRadius: '0.5rem', width: '5rem' }}
                                            src={isLogin && `${process.env.REACT_APP_HOST}${currentUser.avatar}`}
                                            alt={'user avatar'}
                                            onClick={() => handleShowUserOption()}
                                        />
                                    </div>
                                    <p className="mt-2 mb-2 fs-3 text-center">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                                </div>
                            )}
                        >
                            <Link>Profile</Link>
                            <Link to={'/admin/login'} onClick={() => logOut()}>
                                Logout
                            </Link>
                        </NotifyBoard>
                    )}
                    <img
                        src={isLogin && `${process.env.REACT_APP_HOST}${currentUser.avatar}`}
                        alt={'user avatar'}
                        onClick={() => handleShowUserOption()}
                    />
                    {/* <FontAwesomeIcon icon={faUser} onClick={() => handleShowUserOption()} /> */}
                </div>
            </div>
        </header>
    );
};
function mapStateToProps(state) {
    const { currentUser, isLogin } = state.authReducer;
    return {
        currentUser: currentUser,
        isLogin: isLogin,
    };
}
export default connect(mapStateToProps)(Header);
