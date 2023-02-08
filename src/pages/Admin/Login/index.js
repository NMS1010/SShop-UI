import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import { connect } from 'react-redux';
import * as authActions from '../../../redux/actions/authActions';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import jwtDecode from 'jwt-decode';
const cx = classNames.bind(styles);

const Login = ({ token, dispatch, message }) => {
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
        dispatch(await authActions.login(inputFields.username, inputFields.password));
        if (token && token.length > 100) {
            let jwtDecodeObj = jwtDecode(token);
            let nameIdentifier = Object.keys(jwtDecodeObj).find((val) => val.includes('nameidentifier'));
            dispatch(await authActions.getCurrentUser(jwtDecodeObj[nameIdentifier]));
        }
        setLoading(false);
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
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
                            <input
                                name="password"
                                onChange={handleChange}
                                type={'password'}
                                value={inputFields.password}
                            />
                            <small>{validationMessage.password}</small>
                        </div>
                        <div className={cx('action-btn')}>
                            <Button className={cx('submit-btn')} type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
function mapStateToProps(state) {
    const { accessToken, currentUser } = state.authReducer;
    const { message } = state.messageReducer;
    return {
        token: accessToken,
        currentUser: currentUser,
        message: message,
    };
}
export default connect(mapStateToProps)(Login);
