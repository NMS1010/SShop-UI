import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from '../../CommonCSSForm/CommonCSSForm.module.scss';

import FileUploader from '../../../../components/FileUploader';

import Loading from '../../../../components/Loading';
import * as productsAPI from '../../../../services/productsAPI';
import * as brandsAPI from '../../../../services/brandsAPI';
import * as categoriesAPI from '../../../../services/categoriesAPI';
import * as messageAction from '../../../../redux/actions/messageAction';
import { Button, Col, Form, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

const ProductForm = ({ setAction = () => {}, product = null, products = [], getAllProducts = () => {} }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputFields, setInputFields] = useState({
        name: product?.name,
        price: product?.price,
        quantity: product?.quantity,
        description: product?.description,
        status: product?.status,
        origin: product?.origin,
        categoryId: product?.categoryId,
        brandId: product?.brandId,
    });
    const [fileSelected, setFileSelected] = useState(null);
    const [listFileSelected, setListFileSelected] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [fileSelectedError, setFileSelectedError] = useState('');
    useEffect(() => {
        setLoading(true);
        const fetchBrands = async () => {
            const response = await brandsAPI.getAllBrands();
            if (!response || !response.isSuccess) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Brand',
                        message: response?.errors || 'Error while retrieving brands',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
                setAction({ add: false, edit: false, delete: false });
            } else {
                setBrands(response?.data?.items);
            }
        };
        const fetchCategories = async () => {
            const response = await categoriesAPI.getAllCategories();
            if (!response || !response.isSuccess) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Category',
                        message: response?.errors || 'Error while retrieving categories',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
                setAction({ add: false, edit: false, delete: false });
            } else {
                setCategories(response?.data?.items);
                setLoading(false);
            }
        };
        fetchBrands();
        fetchCategories();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.stopPropagation();
        e.preventDefault();
        if (!form.checkValidity()) {
            return;
        }
        const productObj = {
            ...inputFields,
        };

        const handleProduct = async () => {
            setLoading(true);
            let response =
                product !== null
                    ? await productsAPI.updateProduct(productObj)
                    : await productsAPI.createProduct(productObj);

            if (response === 401) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Login',
                        message: 'Token has expired, please login to continue',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
                navigate('/admin/login');
            }
            if (!response || !response.isSuccess) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Product',
                        message: response?.errors || 'Error while handling this product',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
            } else {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Product',
                        message: 'Handling this product successfully',
                        backgroundColor: '#5cb85c',
                        icon: '',
                    }),
                );
                setAction({ add: false, edit: false, delete: false });
                await getAllProducts();
            }
            setLoading(false);
        };
        handleProduct();
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('container')}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} md="4" className="mb-3" controlId="validationName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Product Name"
                                    value={inputFields?.name}
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your product name
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" className="mb-3" controlId="validationPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Product Price"
                                    value={inputFields?.price}
                                    name="price"
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your product price
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" className="mb-3" controlId="validationQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Product Quantity"
                                    value={inputFields?.quantity}
                                    name="quantity"
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your product quantity
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="8" className="mb-3" controlId="validationDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    name="description"
                                    placeholder="Description"
                                    value={inputFields?.description}
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter product description
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" className="mb-3" controlId="validationStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    onChange={(e) => handleChange(e)}
                                    name="status"
                                    value={inputFields?.status}
                                >
                                    <option value={0}>In stock</option>
                                    <option value={1}>Out stock</option>
                                    <option value={2}>Suspended</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    onChange={(e) => handleChange(e)}
                                    name="status"
                                    value={inputFields?.categoryId}
                                >
                                    {categories.map((val) => {
                                        return <option value={val.categoryId}>{val.name}</option>;
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="mb-3" controlId="validationBrand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Select
                                    onChange={(e) => handleChange(e)}
                                    name="status"
                                    value={inputFields?.brandId}
                                >
                                    {brands.map((val) => {
                                        return <option value={val.brandId}>{val.brandName}</option>;
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <div className="text-center mt-5">
                            <Button variant="outline-info" type="submit" className="fs-3 rounded-4 p-3 w-25">
                                {product ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </>
    );
};
export default ProductForm;
