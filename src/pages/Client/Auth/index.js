import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import login from '../../../assets/images/client/login.jpg';
const Auth = () => {
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
                        <form className="mt-8 space-y-6" action="#" method="POST">
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
                                        required
                                        className="relative text-2xl block w-full h-16 rounded-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        placeholder="Email address"
                                    />
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
                                        required
                                        className="relative block w-full h-16 rounded-xl text-2xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label for="remember-me" className=" text-2xl ml-2 block text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="text-2xl font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative text-3xl p-4 mt-5 flex w-full m-auto justify-center rounded-md bg-indigo-600  font-semibold text-white hover:bg-indigo-500  transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="grow-0 w-2/4 ">
                <img src={login} />
            </div>
        </div>
    );
};

export default Auth;
