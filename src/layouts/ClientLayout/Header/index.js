import { Link, NavLink } from 'react-router-dom';
import config from '../../../configs';
const Header = () => {
    let active =
        'text-3xl block py-2 pr-6 pl-3 border-b-2 border-cyan-500 text-cyan-700 rounded bg-cyan-700 lg:bg-transparent lg:p-0 dark:text-white';
    let inActive =
        'text-3xl block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-cyan-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';
    return (
        <header className="border-b-2 mb-16 fixed top-0 left-0 right-0 z-10">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center lg:order-1">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9 w-30"
                            alt="SShop Logo"
                        />
                        <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white">
                            SShop
                        </span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <Link
                            className="text-gray-800 dark:text-white hover:bg-gray-50 font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                            to={config.routes.auth}
                        >
                            Log in
                        </Link>
                        <Link
                            className="text-gray-800 hover:text-white bg-cyan-400 hover:bg-cyan-800  font-medium rounded-lg text-2xl px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
                            to={config.routes.signup}
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-0"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to={'/'} className={({ isActive }) => (isActive ? active : inActive)}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/shop'} className={({ isActive }) => (isActive ? active : inActive)}>
                                    Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/contact'} className={({ isActive }) => (isActive ? active : inActive)}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
