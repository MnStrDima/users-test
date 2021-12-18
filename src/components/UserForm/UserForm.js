import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import usersOperations from '../../redux/users/users-operations';
import styles from './UserForm.module.css';
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

export default function UserForm({ setIsModalActive }) {
    const dispatch = useDispatch();
    const [isUserExists, setIsUserExists] = useState(false);
    const users = useSelector(getAllUsers);
    const errorMessage = useSelector(getErrorMessage);

    const handleSubmit = userObj => {

        const userObjTemplate = {
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        };

        if (users.some(({ name }) => name === userObj.name)) {
            setIsUserExists(true);
            setTimeout(() => {
                setIsUserExists(false);
            }, 3000);

            return;
        }

        userObjTemplate.name = userObj.name;
        userObjTemplate.email = userObj.email;
        userObjTemplate.website = userObj.website;
        userObjTemplate.company.name = userObj.company;

        dispatch(usersOperations.addUser(userObjTemplate));
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
                initialValues={{ name: '', email: '', website: '', company: '' }}
                validationSchema={validationSchema}
                onSubmit={({ name, email, website, company }, { resetForm, setSubmitting }) => {
                    handleSubmit({ name, email, website, company });
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="medium"
                    >
                        Add new user
                    </Button>
                </Form>
            </Formik>
        </>
    );
}

UserForm.propTypes = PropTypes.shape({
    setIsModalActive: PropTypes.func.isRequired,
}).isRequired;