import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import UsersTableItem from '../UsersTableItem/UsersTableItem';
import UserForm from '../UserForm/UserForm';
import EditUserForm from '../EditUserForm/EditUserForm';
import Modal from '../Modal/Modal';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import { getVisibleUsers } from '../../redux/users/users-selectors';
import styles from './UsersTable.module.css';

const UsersTable = () => {
    const [isAddUserModalActive, setIsAddUserModalActive] = useState(false);
    const [isEditUserModalActive, setIsEditUserModalActive] = useState(false);
    const [isDeleteUserModalActive, setIsDeleteUserModalActive] = useState(false);
    const [userFormInitialValues, setUserFormInitialValues] = useState({});
    const [userId, setUserId] = useState(null);
    const users = useSelector(getVisibleUsers);
    console.log(users);
    return (
        <>
            {isAddUserModalActive && <Modal isActive={isAddUserModalActive} setIsActive={setIsAddUserModalActive}>
                <UserForm setIsModalActive={setIsAddUserModalActive} />
            </Modal>}
            {isEditUserModalActive && <Modal isActive={isEditUserModalActive} setIsActive={setIsEditUserModalActive}>
                <EditUserForm setIsModalActive={setIsEditUserModalActive}
                    initialValue={userFormInitialValues}
                    setInitialValue={setUserFormInitialValues} />
            </Modal>}
            {isDeleteUserModalActive && <Modal isActive={isDeleteUserModalActive} setIsActive={setIsDeleteUserModalActive}>
                <DeletePopUp setIsModalActive={setIsDeleteUserModalActive} id={userId} />
            </Modal>}
            {users.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    {users.map(user => (
                        <UsersTableItem key={user.id} user={user}
                            setFormInitialValues={setUserFormInitialValues}
                            setEditModalActive={setIsEditUserModalActive}
                            setId={setUserId}
                            setDeleteModalActive={setIsDeleteUserModalActive} />
                    ))}
                </table>
            }
            <Button
                type="button"
                variant="contained"
                color="primary"
                size="medium"
                fullWidth={true}
                onClick={() => setIsAddUserModalActive(true)}
            >
                Add new user
            </Button>
        </>
    )
};

export default UsersTable;