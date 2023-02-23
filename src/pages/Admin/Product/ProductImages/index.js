import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import Table from '../../../../components/Table';
import * as productsAPI from '../../../../services/productsAPI';
import ProductImagesForm from './ProductImagesForm';
import Alert from '../../../../components/Alert';
import OutsideAlerter from '../../../../components/OutsideAlerter';
import ModalWrapper from '../../../../components/ModalWrapper';
import { useDispatch } from 'react-redux';
import * as messageAction from '../../../../redux/actions/messageAction';
import logoutHandler from '../../../../utils/logoutHandler';
import * as authAction from '../../../../redux/actions/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const ProductImages = ({ productId, setEditImage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hiddenColumns = ['productId'];
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedProductImage, setSelectedProductImage] = useState(null);
    const [action, setAction] = useState({
        add: false,
        edit: false,
        delete: false,
    });
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await productsAPI.getAllProductImages(productId);
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setProductImages([]);
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'ProductImages',
                    message: response?.errors || 'Error while retrieving image for this product',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            setLoading(false);
            setProductImages(response?.data?.items);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, []);
    const handleAddProductImages = () => {
        setAction({ add: true, edit: false, delete: false });
        setIsOutClick(false);
    };
    const handleUpdateProductImages = (productImageId) => {
        const productImage = productImages.find((val) => val.id === productImageId);
        if (productImage.isDefault) return;
        setAction({ add: false, edit: true, delete: false });
        setSelectedProductImage(productImage);
        setIsOutClick(false);
    };
    const handleDeleteProductImages = (productImageId) => {
        const productImage = productImages.find((val) => val.id === productImageId);
        if (productImage.isDefault) return;
        setAction({ add: false, edit: false, delete: true });
        setSelectedProductImage(productImage);
        setIsOutClick(false);
    };
    const deleteProductImages = async () => {
        setButtonLoading(true);
        const response = await productsAPI.deleteProductImage(selectedProductImage.id);
        setButtonLoading(false);
        setIsOutClick(true);
        if (!response || !response?.isSuccess) {
            if (response.status === 401) {
                await logoutHandler(dispatch, navigate, messageAction, authAction);
            }
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'ProductImages',
                    message: response?.errors || 'Error while deleting this product image',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'ProductImages',
                    message: 'Succeed in deleting this product image',
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
                <div>
                    <FontAwesomeIcon
                        className="position-absolute fs-1"
                        style={{ top: '6%', left: '50%', transform: 'translate(-50%, -50%)', cursor: 'pointer' }}
                        onClick={() => setEditImage(false)}
                        icon={faCircleXmark}
                    />
                    <Table
                        data={productImages}
                        hiddenColumns={hiddenColumns}
                        uniqueField={'id'}
                        isAddNew={true}
                        handleAddNew={handleAddProductImages}
                        handleUpdateItem={handleUpdateProductImages}
                        handleDeleteItem={handleDeleteProductImages}
                    />
                    {action.add && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <ProductImagesForm
                                    productId={productId}
                                    setAction={setAction}
                                    productImage={selectedProductImage}
                                    getAllProductImages={fetchAPI}
                                />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                    {action.edit && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <ProductImagesForm
                                    productId={productId}
                                    productImage={selectedProductImage}
                                    getAllProductImages={fetchAPI}
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
                                    confirmClick={() => deleteProductImages()}
                                    loading={buttonLoading}
                                />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                </div>
            )}
        </div>
    );
};
export default ProductImages;
