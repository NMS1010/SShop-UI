import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Table from '../../../components/Table';
import * as rolesAPI from '../../../services/rolesAPI';
import RoleForm from './RoleForm';
import Alert from '../../../components/Alert';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ModalWrapper from '../../../components/ModalWrapper';
import * as messageAction from '../../../redux/actions/messageAction';
import { useDispatch } from 'react-redux';
import logoutHandler from '../../../utils/logoutHandler';
import * as authAction from '../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
const Role = () => {
    const hiddenColumns = [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isOutClick, setIsOutClick] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [action, setAction] = useState({
        add: false,
        edit: false,
        delete: false,
    });
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await rolesAPI.getAllRoles();
        if (!response || !response?.isSuccess) {
            setLoading(true);
            setRoles([]);
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Role',
                    message: response?.errors || 'Error while retrieving roles',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            setLoading(false);
            setRoles(response?.data?.items);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, []);
    const handleAddRole = () => {
        setAction({ add: true, edit: false, delete: false });
        setIsOutClick(false);
    };
    const handleUpdateRole = (roleId) => {
        const role = roles.find((val) => val.roleId === roleId);
        setAction({ add: false, edit: true, delete: false });
        setSelectedRole(role);
        setIsOutClick(false);
    };
    const handleDeleteRole = (roleId) => {
        const role = roles.find((val) => val.roleId === roleId);
        setAction({ add: false, edit: false, delete: true });
        setSelectedRole(role);
        setIsOutClick(false);
    };
    const deleteRole = async () => {
        setButtonLoading(true);
        const response = await rolesAPI.deleteRole(selectedRole.roleId);
        setButtonLoading(false);
        setIsOutClick(true);
        if (!response || !response?.isSuccess) {
            if (response.status === 401) {
                await logoutHandler(dispatch, navigate, messageAction, authAction);
            }
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Role',
                    message: response?.errors || 'Error while deleting this role',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Role',
                    message: 'Succeed in deleting this role',
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
                        data={roles}
                        hiddenColumns={hiddenColumns}
                        uniqueField={'roleId'}
                        isAddNew={true}
                        handleAddNew={handleAddRole}
                        handleUpdateItem={handleUpdateRole}
                        handleDeleteItem={handleDeleteRole}
                    />
                    {action.add && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <RoleForm setAction={setAction} roles={roles} getAllRoles={fetchAPI} />
                            </OutsideAlerter>
                        </ModalWrapper>
                    )}
                    {action.edit && !isOutClick && (
                        <ModalWrapper>
                            <OutsideAlerter setIsOut={setIsOutClick}>
                                <RoleForm
                                    roles={roles}
                                    role={selectedRole}
                                    getAllRoles={fetchAPI}
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
                                    content={'Do you want to remove this role ?'}
                                    cancelClick={() => setIsOutClick(true)}
                                    confirmClick={() => deleteRole()}
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

export default Role;
