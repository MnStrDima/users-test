import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button } from '@material-ui/core';
import * as yup from 'yup';

import styles from './EditUserForm.module.css';
import usersOperations from '../../redux/users/users-operations';
import Notification from '../Notification/Notification';
import {
    getAllUsers,
    getErrorMessage,
} from '../../redux/users/users-selectors';

const validationSchema = yup.object({
    name: yup.string().required("Enter users's name"),
    email: yup.string().email().required("Enter users's email"),
    website: yup.string().url().required("Enter users's website"),
    company: yup.string().required("Enter users's company name"),
});

export default function EditUserForm({ setIsModalActive, initialValue, setInitialValue }) {

    const { id, name, email, website, company } = initialValue;
    const dispatch = useDispatch();
    const [isUserExists, setIsUserExists] = useState(false);
    const users = useSelector(getAllUsers);
    const errorMessage = useSelector(getErrorMessage);

    const onCancelButtonClick = () => {
        setIsModalActive(false);
        setInitialValue({});
    };

    const handleSubmit = userObj => {

        const updatedUser = JSON.parse(JSON.stringify(initialValue));
        updatedUser.name = userObj.name;
        updatedUser.website = userObj.website;
        updatedUser.email = userObj.email;
        updatedUser.company.name = userObj?.company?.name;

        if (users.some(({ name }) => name === userObj.name)) {
            setIsUserExists(true);
            setTimeout(() => {
                setIsUserExists(false);
            }, 3000);

            return;
        }

        dispatch(usersOperations.updateUser(updatedUser));
        setIsModalActive(false);

        return setIsUserExists(false);
    };
    return (
        <>
            <Notification
                notificationInit={isUserExists}
                message="This user already exists in your table."
            />
            <Notification
                notificationInit={!!(errorMessage)}
                message={errorMessage}
            />
            <Formik
                initialValues={{ name: name, email: email, website: website, company: company?.name }}
                validationSchema={validationSchema}
                onSubmit={({ name, email, website, company }, { resetForm, setSubmitting }) => {
                    handleSubmit({ name, email, website, company: { name: company } });
                    setSubmitting(false);
                    resetForm();
                }}
            >
                <Form className={styles.userForm}>
                    <Field
                        component={TextField}
                        type="text"
                        name="name"
                        label="Name:"
                        variant="outlined"
                        margin="dense"
                    />
                    <Field
                        component={TextField}
                        type="tel"
                        name="email"
                        label="Email:"
                        variant="outlined"
                        margin="dense"
                    />
                    <Field
                        component={TextField}
                        type="text"
                        name="website"
                        label="Website:"
                        variant="outlined"
                        margin="dense"
                    />
                    <Field
                        component={TextField}
                        type="text"
                        name="company"
                        label="Company:"
                        variant="outlined"
                        margin="dense"
                    />
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            style={{ marginRight: '10px' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="medium"
                        >
                            Edit user
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
                </Form>
            </Formik>
        </>
    );
}