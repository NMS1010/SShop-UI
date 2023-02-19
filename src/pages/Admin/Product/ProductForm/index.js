import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './ProductForm.module.scss';

import FileUploader from '../../../../components/FileUploader';

import Loading from '../../../../components/Loading';
import * as productsAPI from '../../../../services/productsAPI';
import * as brandsAPI from '../../../../services/brandsAPI';
import * as categoriesAPI from '../../../../services/categoriesAPI';
import * as messageAction from '../../../../redux/actions/messageAction';
import { Button, Col, Form, Row } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';

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
    const [numberSubImage, setNumberSubImage] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [listSubImage, setListSubImage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [fileSelectedError, setFileSelectedError] = useState('');
    const [validated, setValidated] = useState(false);
    useEffect(() => {}, [numberSubImage]);
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
        e.preventDefault();
        if (form.checkValidity() === false || (!product && (listSubImage.length === 0 || !mainImage))) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        const formData = new FormData();
        formData.append('Name', inputFields.name);
        formData.append('Price', inputFields.price);
        formData.append('Quantity', inputFields.quantity);
        formData.append('Description', inputFields.description);
        formData.append('Status', inputFields.status || 0);
        formData.append('Origin', inputFields.origin);
        formData.append('CategoryId', inputFields.categoryId || categories[0].categoryId);
        formData.append('BrandId', inputFields.brandId || brands[0].brandId);
        if (mainImage) formData.append('Image', mainImage, mainImage.name);

        if (!product) {
            // get all input type file element
            let list = Array.from(document.getElementsByClassName('input-upload'));
            // get sub image (can duplicate)
            let temp = listSubImage.filter((file) => {
                return list.some((inp) => {
                    return inp?.value && inp.value?.includes(file.name);
                });
            });

            // get sub image (not duplicate)
            let subImg = [];
            if (temp.length !== list.length - 1) {
                temp.forEach((file) => {
                    if (!subImg.some((x) => x.name === file.name)) {
                        subImg.push(file);
                    }
                });
            } else {
                subImg = [...temp];
            }
            setListSubImage(subImg);
            listSubImage.forEach((file) => formData.append('SubImages', file, file.name));
        } else {
            formData.append('ProductId', product?.productId);
        }
        const handleProduct = async () => {
            setLoading(true);
            let response =
                product !== null
                    ? await productsAPI.updateProduct(formData)
                    : await productsAPI.createProduct(formData);
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
                    <h1 className="text-center fs-1 mb-4">Product</h1>
                    <Form validated={validated} noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Row>
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationName">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
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
                                        <Form.Control.Feedback type="invalid">
                                            Please enter product status
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select
                                            onChange={(e) => handleChange(e)}
                                            name="categoryId"
                                            value={inputFields?.categoryId}
                                        >
                                            {categories.map((val) => {
                                                return (
                                                    <option selected key={val.categoryId} value={val.categoryId}>
                                                        {val.name}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter product category
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationBrand">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Select
                                            onChange={(e) => handleChange(e)}
                                            name="brandId"
                                            value={inputFields?.brandId}
                                        >
                                            {brands.map((val) => {
                                                return (
                                                    <option selected key={val.brandId} value={val.brandId}>
                                                        {val.brandName}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please enter product brand
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" className="mb-3" controlId="validationOrigin">
                                        <Form.Label>Product Origin</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={inputFields?.origin}
                                            name="origin"
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your product origin
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                {!product ? (
                                    <Row className="mt-3">
                                        <Col md="3">
                                            <p className="mb-3">Sub Image Number</p>
                                            <NumericInput
                                                onChange={(v) => {
                                                    setNumberSubImage(v);
                                                }}
                                                mobile
                                                className="form-control w-5"
                                                value={numberSubImage}
                                                min={1}
                                                step={1}
                                            />
                                        </Col>
                                        {listSubImage.length !== numberSubImage ? (
                                            <p style={{ color: '#dc3545' }}>Please choose sub product image</p>
                                        ) : (
                                            <p style={{ color: '#dc3545' }}>{fileSelectedError}</p>
                                        )}
                                        <div className="d-inline-flex flex-wrap mt-3">
                                            <ListFileUploader
                                                numberSubImage={numberSubImage}
                                                setListSubImage={setListSubImage}
                                                listSubImage={listSubImage}
                                            />
                                        </div>
                                    </Row>
                                ) : (
                                    <Row className="mt-3">
                                        <p className="mb-3">Sub Image </p>
                                        <div className="d-inline-flex flex-wrap mt-3">
                                            {product.subImages.items.map((item) => {
                                                return (
                                                    !item.isDefault && (
                                                        <div
                                                            key={item.id}
                                                            className="col-md-3 m-2 d-inline-block text-center"
                                                        >
                                                            <img
                                                                width={'100%'}
                                                                src={`${process.env.REACT_APP_HOST}${item.image}`}
                                                            />
                                                        </div>
                                                    )
                                                );
                                            })}
                                        </div>
                                    </Row>
                                )}
                            </Col>
                            <Col md="4">
                                <FileUploader
                                    setFileSelected={setMainImage}
                                    setFileSelectedError={setFileSelectedError}
                                    imgUrl={product?.imagePath}
                                />
                                {!mainImage && !product ? (
                                    <small style={{ color: '#dc3545' }}>Please choose product image</small>
                                ) : (
                                    <small style={{ color: '#dc3545' }}>{fileSelectedError}</small>
                                )}
                            </Col>
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
const ListFileUploader = ({ numberSubImage, setListSubImage, listSubImage }) => {
    const [subImage, setSubImage] = useState(null);
    const [fileSelectedError, setFileSelectedError] = useState('');
    useEffect(() => {
        if (subImage) {
            setListSubImage([...listSubImage, subImage]);
        }
    }, [subImage]);
    return Array.from(Array(numberSubImage)).map((val) => {
        return (
            <div key={val} className="col-md-3 m-2 d-inline-block">
                <FileUploader
                    imgUrl={subImage ? URL.createObjectURL(subImage) : ''}
                    setFileSelected={setSubImage}
                    setFileSelectedError={setFileSelectedError}
                />
            </div>
        );
    });
};
export default ProductForm;
