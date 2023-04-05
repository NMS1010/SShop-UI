import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as productsAPI from '../../../services/productsAPI';
import Carousel from 'react-bootstrap/Carousel';
import * as authUtil from '../../../utils/authUtils';
import { InputNumber } from 'antd';
import Loading from '../../../components/Loading';
import { useDispatch } from 'react-redux';
import * as cartAction from '../../../redux/features/cart/cartSlice';
import * as wishAction from '../../../redux/features/wish/wishSlice';

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const fetchProduct = useCallback(async () => {
        setLoading(true);
        const response = await productsAPI.getProductById(productId);
        if (!response || !response.isSuccess) {
        } else {
            setLoading(false);
            setProduct(response.data);
        }
    }, [productId]);
    useEffect(() => {
        fetchProduct();
    }, [productId]);
    const addToCart = () => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('userId', authUtil.getUserId());
        dispatch(cartAction.addCartItem({ cartItem: formData }));
    };
    const addToWish = () => {
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('userId', authUtil.getUserId());
        dispatch(wishAction.addWishItem({ wishItem: formData }));
    };
    return loading ? (
        <Loading />
    ) : (
        <div className="max-w-screen-xl m-auto">
            <section className="text-gray-700 body-font overflow-hidden bg-white rounded-3xl ">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Carousel className="w-1/2 p-5" activeIndex={index} onSelect={handleSelect} interval={1000}>
                            {product.subImages.items.map((p) => (
                                <Carousel.Item>
                                    <img
                                        alt="img"
                                        className="object-cover object-center rounded border border-gray-200 w-full h-96 "
                                        src={`${process.env.REACT_APP_HOST}${p.image}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-2xl title-font text-gray-500 tracking-widest mb-0">
                                {product.brandName}
                            </h2>
                            <h1 className="mb-3">
                                <Link className="text-blue-300 text-2xl tracking-widest">{product.categoryName}</Link>
                            </h1>
                            <h1 className="text-gray-900 text-5xl title-font font-medium mb-1">{product.name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    {Array.from(Array(5)).map((val, idx) => {
                                        let currentColor = '';
                                        if (idx < product.averageRating) {
                                            currentColor = 'currentColor';
                                        }
                                        return (
                                            <svg
                                                fill={currentColor}
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="w-6 h-6 text-red-500"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                        );
                                    })}

                                    <span className="text-gray-600 ml-3">
                                        {product.productReview.items.length} Reviews
                                    </span>
                                </span>
                            </div>
                            <p className="leading-relaxed pb-5 border-b-2">{product.description}</p>

                            <div className="flex mt-5 items-center">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    {product.price} VND
                                </span>
                                <button
                                    onClick={addToWish}
                                    className="rounded-full ml-auto w-20 h-20 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500"
                                >
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-10 h-10"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex mt-5">
                                <InputNumber
                                    className="mr-5"
                                    size="large"
                                    min={1}
                                    value={quantity}
                                    defaultValue={1}
                                    onChange={(e) => setQuantity(e)}
                                />
                                <button
                                    onClick={addToCart}
                                    className=" text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mt-20 bg-white py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center  rounded-3xl ">
                <div className="flex flex-col justify-start items-start w-full space-y-8">
                    <p className="w-full text-center text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">
                        Customer reviews
                    </p>

                    <div className="flex w-full justify-around">
                        <div className="mx-10 bg-white shadow-lg rounded-lg px-4 py-4 w-1/2 ">
                            <div className="mb-1 tracking-wide px-4 py-4">
                                <h2 className="text-gray-800 font-semibold mt-1 text-center">
                                    {product.productReview.items.length} users reviews
                                </h2>
                                <div className="border-b -mx-8 px-8 pb-3">
                                    <div className="flex items-center mt-1">
                                        <div className=" w-1/5 text-indigo-500 tracking-tighter">
                                            <span>5 star</span>
                                        </div>
                                        <div className="w-3/5">
                                            <div className="bg-gray-300 w-full rounded-lg h-2">
                                                <div className=" w-7/12 bg-indigo-600 rounded-lg h-2"></div>
                                            </div>
                                        </div>
                                        <div className="w-1/5 text-gray-700 pl-3">
                                            <span className="text-sm">51%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className="w-1/5 text-indigo-500 tracking-tighter">
                                            <span>4 star</span>
                                        </div>
                                        <div className="w-3/5">
                                            <div className="bg-gray-300 w-full rounded-lg h-2">
                                                <div className="w-1/5 bg-indigo-600 rounded-lg h-2"></div>
                                            </div>
                                        </div>
                                        <div className="w-1/5 text-gray-700 pl-3">
                                            <span className="text-sm">17%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className="w-1/5 text-indigo-500 tracking-tighter">
                                            <span>3 star</span>
                                        </div>
                                        <div className="w-3/5">
                                            <div className="bg-gray-300 w-full rounded-lg h-2">
                                                <div className=" w-3/12 bg-indigo-600 rounded-lg h-2"></div>
                                            </div>
                                        </div>
                                        <div className="w-1/5 text-gray-700 pl-3">
                                            <span className="text-sm">19%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className=" w-1/5 text-indigo-500 tracking-tighter">
                                            <span>2 star</span>
                                        </div>
                                        <div className="w-3/5">
                                            <div className="bg-gray-300 w-full rounded-lg h-2">
                                                <div className=" w-1/5 bg-indigo-600 rounded-lg h-2"></div>
                                            </div>
                                        </div>
                                        <div className="w-1/5 text-gray-700 pl-3">
                                            <span className="text-sm">8%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className="w-1/5 text-indigo-500 tracking-tighter">
                                            <span>1 star</span>
                                        </div>
                                        <div className="w-3/5">
                                            <div className="bg-gray-300 w-full rounded-lg h-2">
                                                <div className=" w-2/12 bg-indigo-600 rounded-lg h-2"></div>
                                            </div>
                                        </div>
                                        <div className="w-1/5 text-gray-700 pl-3">
                                            <span className="text-sm">5%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-6 w-full flex justify-start items-start flex-col p-8">
                            {product.productReview.items.length > 0 ? (
                                product.productReview.items.map((productRv) => {
                                    return (
                                        <>
                                            <div className="flex flex-col md:flex-row justify-between w-full">
                                                <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                                    <div>
                                                        <img
                                                            src={`${process.env.REACT_APP_HOST}${productRv.userAvatar}`}
                                                            alt="avatar"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-start items-start space-y-2">
                                                        <p className="text-3xl font-medium leading-none text-gray-800 dark:text-white">
                                                            {productRv.userName}
                                                        </p>
                                                        <p className="text-xl leading-none text-gray-600 dark:text-white">
                                                            {productRv.dateUpdated}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="cursor-pointer mt-2 md:mt-0">
                                                    <svg
                                                        className="text-yellow-500"
                                                        width="152"
                                                        height="24"
                                                        viewBox="0 0 152 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        {Array.from(Array(5)).map((val, idx) => {
                                                            if (idx < productRv.rating) {
                                                                return (
                                                                    <g clip-path="url(#clip0)">
                                                                        <path
                                                                            d="M17.5598 24.4285C17.3999 24.4291 17.2422 24.3914 17.0998 24.3185L11.9998 21.6485L6.89982 24.3185C6.73422 24.4056 6.5475 24.4444 6.3609 24.4307C6.1743 24.4169 5.9953 24.3511 5.84425 24.2407C5.6932 24.1303 5.57616 23.9797 5.50644 23.8061C5.43671 23.6324 5.4171 23.4427 5.44982 23.2585L6.44982 17.6285L2.32982 13.6285C2.20128 13.5002 2.1101 13.3394 2.06605 13.1632C2.02201 12.987 2.02677 12.8022 2.07982 12.6285C2.13778 12.4508 2.2444 12.2928 2.38757 12.1726C2.53075 12.0525 2.70475 11.9748 2.88982 11.9485L8.58982 11.1185L11.0998 5.98849C11.1817 5.81942 11.3096 5.67683 11.4687 5.57706C11.6279 5.47729 11.812 5.42438 11.9998 5.42438C12.1877 5.42438 12.3717 5.47729 12.5309 5.57706C12.6901 5.67683 12.8179 5.81942 12.8998 5.98849L15.4398 11.1085L21.1398 11.9385C21.3249 11.9648 21.4989 12.0425 21.6421 12.1626C21.7852 12.2828 21.8919 12.4408 21.9498 12.6185C22.0029 12.7922 22.0076 12.977 21.9636 13.1532C21.9196 13.3294 21.8284 13.4902 21.6998 13.6185L17.5798 17.6185L18.5798 23.2485C18.6155 23.436 18.5968 23.6297 18.526 23.8069C18.4551 23.9841 18.335 24.1374 18.1798 24.2485C17.9987 24.3754 17.7807 24.4387 17.5598 24.4285V24.4285Z"
                                                                            fill="currentColor"
                                                                        />
                                                                    </g>
                                                                );
                                                            }
                                                            return (
                                                                <g clip-path="url(#clip4)">
                                                                    <path
                                                                        d="M135.146 16.911L131.052 12.9355L136.734 12.1081L137.256 12.032L137.488 11.558L139.998 6.42798L139.998 6.42798L140 6.42443L140.004 6.4329L142.544 11.5529L142.777 12.0225L143.296 12.0981L148.978 12.9255L144.883 16.901L144.502 17.2708L144.595 17.7934L145.595 23.4234L145.595 23.4234L145.597 23.4356L145.605 23.4463L145.56 24.4285L145.556 23.4474L145.564 23.4326L140.464 20.7626L140 20.5197L139.536 20.7626L134.436 23.4326L134.434 23.4334L135.434 17.8034L135.527 17.2808L135.146 16.911Z"
                                                                        stroke="currentColor"
                                                                        stroke-width="2"
                                                                    />
                                                                </g>
                                                            );
                                                        })}

                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="24" height="24" fill="white" />
                                                            </clipPath>
                                                            <clipPath id="clip1">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    fill="white"
                                                                    transform="translate(32)"
                                                                />
                                                            </clipPath>
                                                            <clipPath id="clip2">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    fill="white"
                                                                    transform="translate(64)"
                                                                />
                                                            </clipPath>
                                                            <clipPath id="clip3">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    fill="white"
                                                                    transform="translate(96)"
                                                                />
                                                            </clipPath>
                                                            <clipPath id="clip4">
                                                                <rect
                                                                    width="24"
                                                                    height="24"
                                                                    fill="white"
                                                                    transform="translate(128)"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div id="menu" className="md:block">
                                                <p className="mt-3 text-2xl leading-normal text-gray-600 dark:text-white w-full md:w-9/12 xl:w-5/6">
                                                    {productRv.content}
                                                </p>
                                            </div>
                                        </>
                                    );
                                })
                            ) : (
                                <h2 className="text-3xl">Không có đánh giá</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetail;
