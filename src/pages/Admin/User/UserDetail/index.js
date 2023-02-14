import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import FileUploader from '../../../../components/FileUploader';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const UserDetail = ({ selectedUser }) => {
    const userRoles = selectedUser.roles.map((val) => {
        return {
            label: val.roleName,
            value: val.roleId,
        };
    });
    const [roles, setRoles] = useState([]);
    const [fileSelected, setFileSelected] = useState(null);
    const [fileSelectedError, setFileSelectedError] = useState('');
    const [validated, setValidated] = useState(false);
    const handleSubmit = () => {};
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="First Name" value={selectedUser?.firstName} />
                    <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Last Name" value={selectedUser?.lastName} />
                    <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationDob">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="date" value={selectedUser?.dob} />
                    <Form.Control.Feedback type="invalid">Please enter your birthday</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Email" value={selectedUser?.email} />
                    <Form.Control.Feedback type="invalid">Please enter your email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Phone"
                        value={selectedUser?.phoneNumber}
                        pattern="[0-9]{10}"
                    />
                    <Form.Control.Feedback type="invalid">Please enter your phone number</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select>
                        <option selected={selectedUser?.gender === 'Nam' || true} value={'Nam'}>
                            Male
                        </option>
                        <option selected={selectedUser?.gender === 'Nữ'} value={'Nữ'}>
                            Female
                        </option>
                        <option selected={selectedUser?.gender === 'Khác'} value={'Khác'}>
                            Other
                        </option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required as="textarea" placeholder="Address" value={selectedUser?.address} />
                    <Form.Control.Feedback type="invalid">Please enter your address</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control disabled type="text" value={selectedUser?.username} />
                    <Form.Control.Feedback type="invalid">Please enter your user name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select>
                        <option value={'0'}>Inactive</option>
                        <option value={'1'}>Active</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationAvatar">
                    <FileUploader
                        imgUrl={selectedUser?.avatar}
                        setFileSelected={setFileSelected}
                        setFileSelectedError={setFileSelectedError}
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationRole">
                    <Form.Label>Roles</Form.Label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        defaultValue={userRoles}
                        options={roles}
                    />
                </Form.Group>
            </Row>
        </Form>
    );
};

export default UserDetail;
