import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import FileUploader from '../../../../components/FileUploader';
import Loading from '../../../../components/Loading';
import * as rolesAPI from '../../../../services/rolesAPI';
import * as usersAPI from '../../../../services/usersAPI';
import * as messageAction from '../../../../redux/actions/messageAction';
import * as authAction from '../../../../redux/actions/authAction';

const animatedComponents = makeAnimated();
const cx = classNames.bind(styles);
const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state?.authReducer);
    const selectedUser = user || currentUser;
    const userRoles = selectedUser?.roles?.map((val) => {
        return {
            label: val.roleName,
            value: val.roleId,
        };
    });
    const [inputFields, setInputFields] = useState({
        userId: selectedUser?.userId,
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        email: selectedUser?.email,
        phoneNumber: selectedUser?.phoneNumber,
        dob: selectedUser?.dob,
        gender: selectedUser?.gender,
        roles: userRoles,
        userName: selectedUser?.userName,
        status: selectedUser?.status,
        address: selectedUser?.address,
    });
    const [allRoles, setAllRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fileSelected, setFileSelected] = useState(null);
    const [fileSelectedError, setFileSelectedError] = useState('');
    //const [validated, setValidated] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputFields({ ...inputFields, [name]: value });
    };
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        let response = await rolesAPI.getAllRoles();
        if (!response || !response.isSuccess) {
        } else {
            setAllRoles(
                response?.data?.items.map((val) => {
                    return {
                        label: val.roleName,
                        value: val.roleId,
                    };
                }),
            );
            setLoading(false);
        }
    });
    useEffect(() => {
        fetchAPI();
    }, []);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.stopPropagation();
        e.preventDefault();
        if (!form.checkValidity() || inputFields?.roles?.length === 0) {
            return;
        }
        // setValidated(true);

        const handleUpdateUser = async () => {
            const roleIdsChosen = inputFields?.roles?.map((r) => {
                return r.value;
            });
            const userObj = {
                ...inputFields,
                roles: JSON.stringify(roleIdsChosen),
                avatar: fileSelected,
            };
            setLoading(true);
            const response = await usersAPI.updateUser(userObj);
            if (!response || !response.isSuccess) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Update',
                        message: 'Failed to update your profile',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
            } else {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Update',
                        message: 'Update your profile successfull',
                        backgroundColor: '#5cb85c',
                        icon: '',
                    }),
                );

                dispatch(await authAction.getCurrentUser());
            }
            setLoading(false);
        };
        handleUpdateUser();
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('container')}>
                    <Row className="justify-content-evenly">
                        <Col
                            className="bg-white p-5 rounded-5 mb-3"
                            md="3"
                            sm="12"
                            style={{ height: '100%', boxShadow: 'rgb(90 114 123 / 11%) 0px 7px 30px 0px' }}
                        >
                            <div className="text-center mb-5 border-bottom">
                                <img
                                    className="img-fluid rounded-5"
                                    style={{ width: '10rem' }}
                                    src={`${process.env.REACT_APP_HOST}/${selectedUser?.avatar}`}
                                    alt={'user avatar'}
                                />
                                <p
                                    className="fs-3 mt-3 pb-3"
                                    style={{ fontWeight: '500' }}
                                >{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</p>
                            </div>
                            <div
                                style={{ fontWeight: 'bold' }}
                                className="d-flex text-center justify-content-between mb-4"
                            >
                                <div className="me-3">
                                    <p>{selectedUser?.totalBought}</p>
                                    <p>Tổng đã mua</p>
                                </div>
                                <div className="ms-3">
                                    <p>{selectedUser?.totalOrders}</p>
                                    <p>Tổng đơn hàng</p>
                                </div>
                            </div>
                            <div style={{ fontWeight: 'bold' }} className="ms-3 text-center">
                                <p>{selectedUser?.totalCost}</p>
                                <p>Tổng tiền</p>
                            </div>
                            <div className="border-top pt-4">
                                <p className="fs-3" style={{ fontWeight: 'bold' }}>
                                    Thông tin liên hệ
                                </p>
                                <div>
                                    <p className="fs-4" style={{ fontWeight: 'bold' }}>
                                        Address
                                    </p>
                                    <p className="fs-4">{selectedUser?.address}</p>
                                </div>
                                <div>
                                    <p className="fs-4" style={{ fontWeight: 'bold' }}>
                                        Email
                                    </p>
                                    <p className="fs-4">{selectedUser?.email}</p>
                                </div>
                                <div>
                                    <p className="fs-4" style={{ fontWeight: 'bold' }}>
                                        Phone number
                                    </p>
                                    <p className="fs-4">{selectedUser?.phoneNumber}</p>
                                </div>
                            </div>
                        </Col>
                        <Col
                            md="8"
                            sm="12"
                            className="bg-white p-5 rounded-5"
                            style={{ boxShadow: 'rgb(90 114 123 / 11%) 0px 7px 30px 0px' }}
                        >
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="validationFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First Name"
                                        value={inputFields?.firstName}
                                        name="firstName"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last Name"
                                        value={inputFields?.lastName}
                                        name="lastName"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your last name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Email"
                                        value={inputFields?.email}
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="validationPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Phone"
                                        value={inputFields?.phoneNumber}
                                        name="phoneNumber"
                                        pattern="[0-9]{10}"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your phone number
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationDob">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        value={inputFields?.dob}
                                        name="dob"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your birthday
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleChange(e)}
                                        name="gender"
                                        value={inputFields?.gender}
                                    >
                                        <option value={'Nam'}>Male</option>
                                        <option value={'Nữ'}>Female</option>
                                        <option value={'Khác'}>Other</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationRole">
                                    <Form.Label>Roles</Form.Label>
                                    <Select
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: inputFields?.roles?.length !== 0 ? 'grey' : '#dc3545',
                                            }),
                                        }}
                                        name="userRoles"
                                        onChange={(choices) => setInputFields({ ...inputFields, roles: choices })}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        defaultValue={userRoles}
                                        options={allRoles}
                                        isClearable={false}
                                    />
                                    {inputFields?.roles?.length === 0 && (
                                        <small style={{ color: '#dc3545' }}>Please choose your roles</small>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        disabled
                                        name="userName"
                                        type="text"
                                        value={inputFields?.userName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your user name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        onChange={(e) => handleChange(e)}
                                        name="status"
                                        value={inputFields?.status}
                                    >
                                        <option value={0}>Inactive</option>
                                        <option value={1}>Active</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        name="address"
                                        placeholder="Address"
                                        value={inputFields?.address}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your address
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationAvatar">
                                    <div className="text-center">
                                        <FileUploader
                                            imgUrl={selectedUser?.avatar}
                                            setFileSelected={setFileSelected}
                                            setFileSelectedError={setFileSelectedError}
                                        />
                                        <small>{fileSelectedError}</small>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Button
                                            variant="outline-info"
                                            type="submit"
                                            className="fs-3 rounded-4 p-3 w-25"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default Profile;
