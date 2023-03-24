import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import loginBg from '../../../assets/images/client/login.jpg';
import * as authAction from '../../../redux/features/auth/authSlice';
import * as messageAction from '../../../redux/features/message/messageSlice';
import * as usersAPI from '../../../services/usersAPI';
import config from '../../../configs';
import { getUserId } from '../../../utils/authUtils';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitFirstPress, setSubmitFirstPress] = useState(false);
    const [loginFormInput, setLoginFormInput] = useState({
        username: '',
        password: '',
    });
    const [validateMessage, setValidateMessage] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFormInput({ ...loginFormInput, [name]: value });
    };
    const validattion = () => {
        let validated = true;
        let errors = { username: '', password: '' };
        if (!loginFormInput.username) {
            errors.username = 'Please enter your username';
            validated = false;
        }
        if (!loginFormInput.password) {
            errors.password = 'Please enter your password';
            validated = false;
        }
        setValidateMessage(errors);
        return validated;
    };
    useEffect(() => {
        if (submitFirstPress) validattion();
    }, [loginFormInput]);
    const handleSubmit = async (e) => {
        setSubmitFirstPress(true);
        e.preventDefault();
        if (!validattion()) return;
        setLoading(true);
        await dispatch(authAction.login({ username: loginFormInput.username, password: loginFormInput.password }));
        setLoading(false);
        const res = await usersAPI.getUserById(getUserId());
        const currentUser = res.data;
        let url = config.routes.home;
        if (currentUser && currentUser.roles) {
            const res = currentUser.roles.some((role) => role?.roleName === 'Admin');
            if (res) {
                url = config.routes.admin_home;
            }
        }
        navigate(url);
    };
    return (
        <div className="flex max-w-screen-xl m-auto ">
            <div className="grow p-5">
                <h2 className="text-center text-6xl font-bold">Sign in to your account</h2>
                <div>
                    <h3 className="text-2xl mt-5 mb-3 text-center">Sign in with</h3>
                    <div className="flex justify-evenly my-3">
                        <div className="">
                            <button className="py-2 px-24 border border-1 hover:bg-cyan-500 transition-all duration-500">
                                <FontAwesomeIcon icon={faFacebook} />
                            </button>
                        </div>
                        <div className="">
                            <button className="py-2 px-24 border border-1 hover:bg-red-400 transition-all duration-500">
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-center w-max m-auto">
                        <hr class="w-64 h-1 my-8 bg-gray-500 border-0 rounded dark:bg-gray-700" />
                        <p className="text-2xl mx-4 mt-2 text-slate-400">Or sign in with</p>
                        <hr class="w-64 h-1 my-8 bg-gray-500 border-0 rounded dark:bg-gray-700" />
                    </div>
                    <div>
                        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" value="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label for="username" className="text-2xl font-bold mb-3">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autocomplete="username"
                                        className="relative text-2xl block w-full h-16 rounded-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        placeholder="Email address"
                                        onChange={handleChange}
                                    />
                                    {validateMessage.username && (
                                        <p className="text-red-400 mt-3">{validateMessage.username}</p>
                                    )}
                                </div>
                                <div className="mt-3">
                                    <label for="password" className="text-2xl font-bold mb-3">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autocomplete="current-password"
                                        className="relative block w-full h-16 rounded-xl text-2xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                    {validateMessage.password && (
                                        <p className="text-red-400 mt-3">{validateMessage.password}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="#" className="text-2xl font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="group relative text-3xl p-4 mt-5 flex w-full m-auto justify-center rounded-md bg-indigo-600  font-semibold text-white hover:bg-indigo-500  transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="grow-0 w-2/4 ">
                <img src={loginBg} />
            </div>
        </div>
    );
};

export default Login;