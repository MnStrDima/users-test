import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Box,
    IconButton,
    SvgIcon,
} from '@material-ui/core';
import { TableCell, TableRow } from '@mui/material';
import { getAllUpdatedUsers } from '../../redux/users/users-selectors';


const UsersTableItem = ({ user, setFormInitialValues,
    setEditModalActive,
    setId,
    setDeleteModalActive }) => {
    const allUpdatedUsers = useSelector(getAllUpdatedUsers);
    const { id, name, email, website, company } = user;

    const isUpdated = allUpdatedUsers.includes(id);

    const onDeleteButtonClick = () => {
        setId(id);
        setDeleteModalActive(true);
    };

    const onEditButtonClick = () => {
        setFormInitialValues(user);
        setEditModalActive(true);
    };

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row"
                    style={isUpdated ? { fontFamily: "satisfy" } : null}>
                    {name}
                </TableCell>
                <TableCell align="left"
                    style={isUpdated ? { fontFamily: "satisfy" } : null}>{email}</TableCell>
                <TableCell align="right"
                    style={isUpdated ? { fontFamily: "satisfy" } : null}>{website}</TableCell>
                <TableCell align="right"
                    style={isUpdated ? { fontFamily: "satisfy" } : null}>{company?.name}</TableCell>
                <TableCell align="right">
                    <Box>
                        <IconButton aria-label="edit" type="button" onClick={onEditButtonClick}>
                            <SvgIcon>
                                <path
                                    fill="currentColor"
                                    d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
                                />
                            </SvgIcon>
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            type="button"
                            onClick={onDeleteButtonClick}
                        >
                            <SvgIcon>
                                <path
                                    fill="currentColor"
                                    d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                                />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
        </>
    )
};

export default UsersTableItem;

UsersTableItem.propTypes = PropTypes.shape({
    user: PropTypes.object.isRequired,
}).isRequired;