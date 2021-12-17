import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import { Table, TableBody, TableRow, TableHead, Paper, TableContainer, TableCell } from '@mui/material';
import UsersTableItem from '../UsersTableItem/UsersTableItem';
import UserForm from '../UserForm/UserForm';
import EditUserForm from '../EditUserForm/EditUserForm';
import Modal from '../Modal/Modal';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import { getVisibleUsers } from '../../redux/users/users-selectors';

const UsersTable = () => {
    const [isAddUserModalActive, setIsAddUserModalActive] = useState(false);
    const [isEditUserModalActive, setIsEditUserModalActive] = useState(false);
    const [isDeleteUserModalActive, setIsDeleteUserModalActive] = useState(false);
    const [userFormInitialValues, setUserFormInitialValues] = useState({});
    const [userId, setUserId] = useState(null);
    const users = useSelector(getVisibleUsers);

    return (
        <>
            <Modal isActive={isAddUserModalActive} setIsActive={setIsAddUserModalActive}>
                <UserForm setIsModalActive={setIsAddUserModalActive} />
            </Modal>

            <Modal isActive={isEditUserModalActive} setIsActive={setIsEditUserModalActive}>
                <EditUserForm setIsModalActive={setIsEditUserModalActive}
                    initialValue={userFormInitialValues}
                    setInitialValue={setUserFormInitialValues} />
            </Modal>

            <Modal isActive={isDeleteUserModalActive} setIsActive={setIsDeleteUserModalActive}>
                <DeletePopUp setIsModalActive={setIsDeleteUserModalActive} id={userId} />
            </Modal>

            {users.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="right">Website</TableCell>
                                <TableCell align="right">Company</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <UsersTableItem key={user.id} user={user}
                                    setFormInitialValues={setUserFormInitialValues}
                                    setEditModalActive={setIsEditUserModalActive}
                                    setId={setUserId}
                                    setDeleteModalActive={setIsDeleteUserModalActive} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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