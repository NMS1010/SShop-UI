import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as productsAPI from '../../../services/productsAPI';
import ProductForm from './ProductForm';
import Alert from '../../../components/Alert';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ModalWrapper from '../../../components/ModalWrapper';
import { useDispatch } from 'react-redux';
import * as messageAction from '../../../redux/actions/messageAction';
import logoutHandler from '../../../utils/logoutHandler';
import * as authAction from '../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hiddenColumns = [
        'dateCreated',
        'categoryId',
        'brandId',
        'subImages',
        'productReview',
        'status',
        'statusClass',
    ];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [action, setAction] = useState({
        add: false,
        edit: false,
        delete: false,
    });
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await productsAPI.getAllProducts();
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setProducts([]);
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Product',
                    message: response?.errors || 'Error while retrieving products',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            setLoading(false);
            setProducts(response?.data?.items);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, [isOutClick]);
    const handleAddProduct = () => {
        setAction({ add: true, edit: false, delete: false });
        setIsOutClick(false);
    };
    const handleUpdateProduct = (productId) => {
        const product = products.find((val) => val.productId === productId);
        setAction({ add: false, edit: true, delete: false });
        setSelectedProduct(product);
        setIsOutClick(false);
    };
    const handleDeleteProduct = (productId) => {
        const product = products.find((val) => val.productId === productId);
        setAction({ add: false, edit: false, delete: true });
        setSelectedProduct(product);
        setIsOutClick(false);
    };
    const deleteProduct = async () => {
        setButtonLoading(true);
        const response = await productsAPI.deleteProduct(selectedProduct.productId);
        setButtonLoading(false);
        setIsOutClick(true);
        if (!response || !response?.isSuccess) {
            if (response.status === 401) {
                await logoutHandler(dispatch, navigate, messageAction, authAction);
            }
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Product',
                    message: response?.errors || 'Error while deleting this product',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Product',
                    message: 'Succeed in deleting this product',
                    backgroundColor: '#5cb85c',
                    icon: '',
                }),
            );
            await fetchAPI();
        }
    };
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Table
                        data={products}
                        hiddenColumns={hiddenColumns}
                        uniqueField={'productId'}
                        isAddNew={true}
                        handleAddNew={handleAddProduct}
                        handleUpdateItem={handleUpdateProduct}
                        handleDeleteItem={handleDeleteProduct}
                    />
                    {action.add && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <ProductForm setAction={setAction} products={products} getAllProducts={fetchAPI} />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                    {action.edit && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <ProductForm
                                    products={products}
                                    product={selectedProduct}
                                    getAllProducts={fetchAPI}
                                    setAction={setAction}
                                />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                    {action.delete && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <Alert
                                    title={'Delete Confirmation'}
                                    content={'Do you want to remove this product ?'}
                                    cancelClick={() => setIsOutClick(true)}
                                    confirmClick={() => deleteProduct()}
                                    loading={buttonLoading}
                                />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                </>
            )}
        </div>
    );
};
export default Product;
