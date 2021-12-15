import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/users/users-actions';
import styles from './Filter.module.css';
import { getFilter } from '../../redux/users/users-selectors';

export default function Filter() {
    const dispatch = useDispatch();
    const initialValue = useSelector(getFilter);
    const onFilterChange = e => dispatch(changeFilter(e.target.value));

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.filterLabel}>
                Find users by name:
                <input
                    className={styles.filterInput}
                    type="text"
                    name="name"
                    value={initialValue}
                    onChange={onFilterChange}
                />
            </label>
        </div>
    );
}