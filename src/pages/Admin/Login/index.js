import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import * as authAction from '../../../redux/features/auth/authSlice';
import Button from '../../../components/Button';
import * as messageAction from '../../../redux/features/message/messageSlice';
import { BACKGROUND_COLOR_FAILED } from '../../../constants';
const cx = classNames.bind(styles);

const Login = () => {
    let { currentUser } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputFields, setInputFields] = useState({
        username: '',
        password: '',
    });
    const [validationMessage, setValidationMessage] = useState({
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const validation = () => {
        let errors = { ...validationMessage };
        inputFields.username?.trim() ? (errors.username = '') : (errors.username = 'Username is required');
        inputFields.password?.trim() ? (errors.password = '') : (errors.password = 'Password is required');
        setValidationMessage(errors);
    };
    useEffect(() => {
        validation();
    }, [inputFields]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValidateErrors = Object.keys(validationMessage).some((err) => {
            return validationMessage[err] !== '';
        });
        if (isValidateErrors) return;
        setLoading(true);
        await dispatch(authAction.login({ username: inputFields.username, password: inputFields.password }));
        setLoading(false);
        if (currentUser && currentUser.roles) {
            const res = currentUser.roles.some((role) => role?.roleName === 'Admin');
            if (!res) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Login',
                        message: "You wasn't permited to access this page",
                        backgroundColor: BACKGROUND_COLOR_FAILED,
                        icon: '',
                    }),
                );
            }
        }
        navigate('/admin/');
    };
    return (
        <>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Login</h1>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label htmlFor="username">Username</label>
                        <input name="username" value={inputFields.username} type={'text'} onChange={handleChange} />
                        <small>{validationMessage.username}</small>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="password">Password</label>
                        <input name="password" onChange={handleChange} type={'password'} value={inputFields.password} />
                        <small>{validationMessage.password}</small>
                    </div>
                    <div className={cx('action-btn')}>
                        <Button loading={loading} className={cx('submit-btn')} type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default Login;
