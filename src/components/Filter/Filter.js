import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { changeFilter } from '../../redux/users/users-actions';
import styles from './Filter.module.css';
import { getFilter } from '../../redux/users/users-selectors';

export default function Filter() {
    const dispatch = useDispatch();
    const initialValue = useSelector(getFilter);
    const onFilterChange = e => dispatch(changeFilter(e.target.value));

    return (
        <div className={styles.inputWrapper}>
            <TextField
                sx={{ width: '100%' }}
                id="outlined-name"
                label="Find users by name:"
                value={initialValue}
                onChange={onFilterChange}
            />
        </div>
    );
}