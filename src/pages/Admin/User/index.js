import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as usersAPI from '../../../services/usersAPI';
import UserDetail from './UserDetail';
import Alert from '../../../components/Alert';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ModalWrapper from '../../../components/ModalWrapper';
import { useDispatch } from 'react-redux';
import * as messageAction from '../../../redux/actions/messageAction';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hiddenColumns = [
        'dateUpdated',
        'password',
        'address',
        'email',
        'status',
        'totalBought',
        'totalWishItem',
        'totalCartItem',
        'totalOrders',
        'totalCost',
        'roleIds',
        'orders',
        'userId',
    ];
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [action, setAction] = useState({
        edit: false,
        delete: false,
    });
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await usersAPI.getAllUsers();
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setusers([]);
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'User',
                    message: response?.errors || 'Error while retrieving users',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
            if (response == 401) {
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
        } else {
            setLoading(false);
            setusers(response?.data?.items);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, []);

    const handleUpdateUser = (userId) => {
        const user = users.find((val) => val.userId === userId);
        setAction({ edit: true, delete: false });
        setSelectedUser(user);
        setIsOutClick(false);
    };
    const handleDeleteUser = (userId) => {
        const user = users.find((val) => val.userId === userId);
        setAction({ edit: false, delete: true });
        setSelectedUser(user);
        setIsOutClick(false);
    };
    const deleteUser = async () => {
        setButtonLoading(true);
        const response = await usersAPI.deleteUser(selectedUser.userId);
        setButtonLoading(false);
        setIsOutClick(true);
        if (!response || !response?.isSuccess) {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'User',
                    message: response?.errors || 'Error while deleting this User',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'User',
                    message: 'Succeed in deleting this User',
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
                        data={users}
                        uniqueField={'userId'}
                        handleUpdateItem={handleUpdateUser}
                        handleDeleteItem={handleDeleteUser}
                        hiddenColumns={hiddenColumns}
                    />
                    {/* {action.edit && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <UserForm
                                    users={users}
                                    user={selectedUser}
                                    getAllUsers={fetchAPI}
                                    setAction={setAction}
                                />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )} */}
                    {action.delete && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <Alert
                                    title={'Delete Confirmation'}
                                    content={'Do you want to change this user`s status ?'}
                                    cancelClick={() => setIsOutClick(true)}
                                    confirmClick={() => deleteUser()}
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
export default User;
