import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as brandsAPI from '../../../services/brandsAPI';
import BrandForm from './BrandForm';
import Alert from '../../../components/Alert';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ModalWrapper from '../../../components/ModalWrapper';
import { connect } from 'react-redux';
import * as messageAction from '../../../redux/actions/messageAction';

const Brand = ({ dispatch }) => {
    const ignoredField = [];
    const [brands, setbrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [action, setAction] = useState({
        add: false,
        edit: false,
        delete: false,
    });
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await brandsAPI.getAllBrands();
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setbrands([]);
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Brand',
                    message: response?.errors || 'Error while retrieving brands',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            setLoading(false);
            setbrands(response?.data?.items);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, []);
    const handleAddBrand = () => {
        setAction({ add: true, edit: false, delete: false });
        setIsOutClick(false);
    };
    const handleUpdateBrand = (brandId) => {
        const brand = brands.find((val) => val.brandId === brandId);
        setAction({ add: false, edit: true, delete: false });
        setSelectedBrand(brand);
        setIsOutClick(false);
    };
    const handleDeleteBrand = (brandId) => {
        const brand = brands.find((val) => val.brandId === brandId);
        setAction({ add: false, edit: false, delete: true });
        setSelectedBrand(brand);
        setIsOutClick(false);
    };
    const deleteBrand = async () => {
        setButtonLoading(true);
        const response = await brandsAPI.deleteBrand(selectedBrand.brandId);
        setButtonLoading(false);
        setIsOutClick(true);
        if (!response || !response?.isSuccess) {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Brand',
                    message: response?.errors || 'Error while deleting this Brand',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Brand',
                    message: 'Succeed in deleting this Brand',
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
                        data={brands}
                        ignoredField={ignoredField}
                        uniqueField={'brandId'}
                        isAddNew={true}
                        handleAddNew={handleAddBrand}
                        handleUpdateItem={handleUpdateBrand}
                        handleDeleteItem={handleDeleteBrand}
                    />
                    {action.add && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <BrandForm setAction={setAction} brands={brands} getAllBrands={fetchAPI} />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                    {action.edit && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <BrandForm
                                    brands={brands}
                                    brand={selectedBrand}
                                    getAllBrands={fetchAPI}
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
                                    content={'Do you want to remove this brand ?'}
                                    cancelClick={() => setIsOutClick(true)}
                                    confirmClick={() => deleteBrand()}
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
function mapStateToProps(state) {
    const { currentUser, isLogin } = state.authReducer;
    const { message } = state.messageReducer;
    return {
        currentUser: currentUser,
        message: message,
        isLogin: isLogin,
    };
}
export default connect(mapStateToProps)(Brand);
