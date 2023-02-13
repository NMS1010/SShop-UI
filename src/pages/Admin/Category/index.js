import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as categoriesAPI from '../../../services/categoriesAPI';
import CategoryForm from './CategoryForm';
import Alert from '../../../components/Alert';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ModalWrapper from '../../../components/ModalWrapper';
import { connect } from 'react-redux';
import * as messageAction from '../../../redux/actions/messageAction';

const Category = ({ dispatch }) => {
    const hiddenColumns = ['parentCategoryId', 'parentCategoryName'];
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [action, setAction] = useState({
        add: false,
        edit: false,
        delete: false,
    });
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await categoriesAPI.getAllCategories();
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setCategories([]);
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Category',
                    message: response?.errors || 'Error while retrieving categories',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            setLoading(false);
            setCategories(response?.data?.items);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, []);
    const handleAddCategory = () => {
        setAction({ add: true, edit: false, delete: false });
        setIsOutClick(false);
    };
    const handleUpdateCategory = (categoryId) => {
        const category = categories.find((val) => val.categoryId === categoryId);
        setAction({ add: false, edit: true, delete: false });
        setSelectedCategory(category);
        setIsOutClick(false);
    };
    const handleDeleteCategory = (categoryId) => {
        const category = categories.find((val) => val.categoryId === categoryId);
        setAction({ add: false, edit: false, delete: true });
        setSelectedCategory(category);
        setIsOutClick(false);
    };
    const deleteCategory = async () => {
        setButtonLoading(true);
        const response = await categoriesAPI.deleteCategory(selectedCategory.categoryId);
        setButtonLoading(false);
        setIsOutClick(true);
        if (!response || !response?.isSuccess) {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Category',
                    message: response?.errors || 'Error while deleting this category',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Category',
                    message: 'Succeed in deleting this category',
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
                        data={categories}
                        hiddenColumns={hiddenColumns}
                        uniqueField={'categoryId'}
                        isAddNew={true}
                        handleAddNew={handleAddCategory}
                        handleUpdateItem={handleUpdateCategory}
                        handleDeleteItem={handleDeleteCategory}
                    />
                    {action.add && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <CategoryForm
                                    setAction={setAction}
                                    categories={categories}
                                    getAllCategories={fetchAPI}
                                />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                    {action.edit && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <CategoryForm
                                    categories={categories}
                                    category={selectedCategory}
                                    getAllCategories={fetchAPI}
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
                                    content={'Do you want to remove this category ?'}
                                    cancelClick={() => setIsOutClick(true)}
                                    confirmClick={() => deleteCategory()}
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
export default connect(mapStateToProps)(Category);
