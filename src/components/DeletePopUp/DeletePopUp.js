import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import usersOperations from '../../redux/users/users-operations';
import styles from './DeletePopUp.module.css'


const DeletePopUp = ({ setIsModalActive, id }) => {
    const dispatch = useDispatch();

    const onDeleteButtonClick = useCallback(
        () => {
            dispatch(usersOperations.deleteUser(id));
            setIsModalActive(false);
        },
        [dispatch, id, setIsModalActive],
    );

    const onCancelButtonClick = () => setIsModalActive(false);

    return (
        <div className={styles.deletePopupWrapper}>
            <p className={styles.deletePopupText}>Do you really want to delete this user?</p>

            <Box>
                <Button
                    style={{ marginRight: '10px' }}
                    type="button"
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={onDeleteButtonClick}
                >
                    Yes
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={onCancelButtonClick}
                >
                    Cancel
                </Button>
            </Box>
        </div >
    )
}

export default DeletePopUp;

DeletePopUp.propTypes = PropTypes.shape({
    setIsModalActive: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}).isRequired;