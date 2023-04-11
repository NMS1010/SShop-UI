import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { useCallback } from 'react';
import * as cartsAPI from '../../../services/cartsAPI';
import * as deliveryMethodAPI from '../../../services/deliveryMethodAPI';
import * as paymentMethodAPI from '../../../services/paymentMethodAPI';
import * as addressAPI from '../../../services/addressAPI';
import * as authUtil from '../../../utils/authUtils';
import { useEffect } from 'react';
import config from '../../../configs';
const Checkout = () => {
    const [loading, setLoading] = useState(true);
    const [selectedCartItems, setSelectedCartItem] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [userAddress, setUserAddress] = useState(null);
    const [total, setTotal] = useState({
        subTotal: 0,
        shipping: 0,
    });
    const [chosenDeliveryMethod, setChosenDeliveryMethod] = useState(null);
    const [chosenPaymentMethod, setChosenPaymentMethod] = useState(null);
    const fetch = useCallback(async () => {
        setLoading(true);
        const cartResp = await cartsAPI.getCartByUserId(authUtil.getUserId(), 1);
        const addressResp = await addressAPI.getAddressByUserId(authUtil.getUserId());
        const deliveryMethodResp = await deliveryMethodAPI.getAllDeliveryMethods();
        const paymentMethodResp = await paymentMethodAPI.getAllPaymentMethods();
        if (
            !cartResp?.isSuccess ||
            !deliveryMethodResp?.isSuccess ||
            !paymentMethodResp?.isSuccess ||
            !addressResp?.isSuccess
        ) {
            return;
        }
        const deliveryMethods = deliveryMethodResp?.data?.items;
        const paymentMethods = paymentMethodResp?.data?.items;
        const cartItems = cartResp?.data?.items;
        const addressItems = addressResp?.data?.items;
        let totalPrice = 0;
        let shipping = 0;
        cartItems.forEach((val) => (totalPrice += val.totalPrice));

        setSelectedCartItem(cartItems);
        setDeliveryMethods(deliveryMethods);
        if (deliveryMethods.length > 0) {
            shipping = deliveryMethods[0].deliveryMethodPrice;
            setChosenDeliveryMethod(deliveryMethods[0]);
        }
        setTotal({ shipping: shipping, subTotal: totalPrice });
        setPaymentMethods(paymentMethods);
        setUserAddress(addressItems.find((val) => val.isDefault === true));

        setLoading(false);
    }, []);
    useEffect(() => {
        fetch();
    }, []);
    const onDeliveryChange = (id) => {
        let deliveryMethod = deliveryMethods.find((val) => val.deliveryMethodId === id);
        setTotal({ ...total, shipping: deliveryMethod.deliveryMethodPrice });
        setChosenDeliveryMethod(deliveryMethod);
    };
    const onPaymentChange = (id) => {
        setChosenPaymentMethod(paymentMethods.find((val) => val.paymentMethodId === id));
    };
    return loading ? (
        <Loading />
    ) : (
        <div className="max-w-screen-xl m-auto">
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <Link to={'/checkout'} className="text-5xl font-bold text-gray-800">
                    Check out
                </Link>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex text-3xl items-center space-x-3 text-left sm:space-x-4">
                                <Link
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                    to={config.routes.cart}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </Link>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex text-3xl items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex text-2xl h-10 w-10 items-center justify-center rounded-full bg-gray-600 font-semibold text-white ring ring-gray-600 ring-offset-2"
                                    href="#"
                                >
                                    2
                                </a>
                                <span className="font-semibold text-gray-900">Shipping & Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 bg-white pb-20">
                <div className="px-4 pt-8">
                    <p className="text-3xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items and select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-6 py-6 sm:px-6">
                        {selectedCartItems.map((item) => {
                            return (
                                <div key={item.cartItemId} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                    <img
                                        className="m-2 h-28 w-28 rounded-md border object-cover object-center"
                                        src={`${process.env.REACT_APP_HOST}${item.imageProduct}`}
                                        alt=""
                                    />
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold text-3xl">{item.productName}</span>
                                        <span className="float-right text-xl  text-gray-400">
                                            {item.quantity} x {item.unitPrice} VND
                                        </span>
                                        <p className="text-xl font-bold">Total: {item.totalPrice} VND</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-8 text-3xl font-medium">Shipping Methods</p>
                    <form className="mt-5 grid gap-6">
                        {deliveryMethods.map((item) => {
                            return (
                                <div key={item.deliveryMethodId} className="relative">
                                    <input
                                        className="peer hidden"
                                        id={`radio_delivery_${item.deliveryMethodId}`}
                                        type="radio"
                                        name="radio"
                                        checked={item.deliveryMethodId === chosenDeliveryMethod.deliveryMethodId}
                                    />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label
                                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                        htmlFor={`radio_delivery_${item.deliveryMethodId}`}
                                        onClick={() => onDeliveryChange(item.deliveryMethodId)}
                                    >
                                        <img
                                            className="w-14 object-contain"
                                            src={`${process.env.REACT_APP_HOST}${item.image}`}
                                            alt=""
                                        />
                                        <div className="ml-5">
                                            <span className="mt-2 font-semibold">{item.deliveryMethodName}</span>
                                            <p className="text-slate-500 text-xl leading-6">
                                                {item.deliveryMethodPrice} VND
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            );
                        })}
                    </form>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-3xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div>
                        <div className="flex mt-8">
                            <p className="text-3xl font-medium">Billing Address</p>
                            <Link className="text-xl mt-2 ml-auto font-medium" to={config.routes.profile}>
                                Change address ?
                            </Link>
                        </div>
                        <form className="mt-5 grid gap-6">
                            {userAddress && (
                                <div className="relative">
                                    <input
                                        className="peer hidden"
                                        id="radio_user_address"
                                        type="radio"
                                        name="radio"
                                        checked
                                    />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label
                                        className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                        htmlFor="radio_user_address"
                                    >
                                        <div className="ml-5">
                                            <span className="mt-2 text-3xl font-semibold">{`${userAddress?.firstName} ${userAddress?.lastName}`}</span>
                                            <p className="text-slate-500 text-xl leading-6">{userAddress?.phone}</p>
                                            <p className="text-slate-500 text-xl leading-6">{`${userAddress?.specificAddress}, ${userAddress?.wardName}, ${userAddress?.districtName}, ${userAddress?.provinceName}`}</p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </form>
                        <p className="mt-8 text-3xl font-medium">Payment Methods</p>
                        <form className="mt-5 grid gap-6">
                            {paymentMethods.map((item) => {
                                return (
                                    <div
                                        onClick={() => onPaymentChange(item.paymentMethodId)}
                                        key={item.paymentMethodId}
                                        className="relative"
                                    >
                                        <input
                                            className="peer hidden"
                                            id={`radio_payment_${item.paymentMethodId}`}
                                            type="radio"
                                            name="radio"
                                            checked
                                        />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label
                                            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                            htmlFor={`radio_payment_${item.paymentMethodId}`}
                                        >
                                            <img
                                                className="w-14 object-contain"
                                                src={`${process.env.REACT_APP_HOST}${item.image}`}
                                                alt=""
                                            />
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">{item.paymentMethodName}</span>
                                            </div>
                                        </label>
                                    </div>
                                );
                            })}
                        </form>
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-medium text-gray-900">Subtotal</p>
                                <p className="font-semibold text-gray-900">{total.subTotal} VND</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-medium text-gray-900">Shipping</p>
                                <p className="font-semibold text-gray-900">{total.shipping} VND</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-2xl font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {total.shipping + total.subTotal} VND
                            </p>
                        </div>
                    </div>
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
